import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import * as t from '@babel/types';
import generate from '@babel/generator';
import MD5 from 'md5.js';

import { FunctionType } from '@app/constants';

import { createInterceptor } from './create-interceptor';

interface Rresult {
  areInterceptorsInjected: boolean;
  content: string;
  functions: {
    type: FunctionType;
    name: string;
    content: string;
    id: string;
  }[];
}

export const injectInterceptor = async (content: string, filePath: string, token: string): Promise<Rresult> => {
  const result: Rresult = {
    areInterceptorsInjected: false,
    content,
    functions: [],
  };

  const ast = parse(content, { sourceType: 'module' });

  traverse(ast, {
    exit(path) {
      if (path.isArrowFunctionExpression()) {
        if (path.parentPath.isVariableDeclarator()) {
          if (path.parentPath.parentPath.isVariableDeclaration()) {
            const variableDeclarationPath = path.parentPath.parentPath;

            if (t.isExportNamedDeclaration(variableDeclarationPath.parent)) {
              const exportNamedDeclarationNode = variableDeclarationPath.parent;
              const leadingComment = exportNamedDeclarationNode.leadingComments?.[0].value;
              if (leadingComment && /@test-next-line/.test(leadingComment)) {
                const name = Object.keys(variableDeclarationPath.getOuterBindingIdentifiers())[0];
                const id = new MD5().update(`${token}${filePath}@${name}`).digest('hex');

                const arrowFunction = generate(path.node);

                result.functions.push({
                  type: FunctionType.Arrow,
                  name,
                  content: arrowFunction.code,
                  id,
                });

                path.replaceWithSourceString(createInterceptor(arrowFunction.code, id));

                result.areInterceptorsInjected = true;
              }
            }
          }
        }
      }
    },
  });

  if (result.areInterceptorsInjected) {
    result.content = `import { _$Proxy } from '@unitless-io/loader/dist/web';\n${generate(ast).code}`;
  }

  return result;
};
