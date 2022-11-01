import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import * as t from '@babel/types';
import generate from '@babel/generator';
import { getFunctionId } from '@unitless-io/local-db';

import { FunctionType, MAGIC_COMMENTS_REGEXP } from '@app/constants';

import { createArrowFunctionInterceptor } from './create-interceptor';

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

export const injectInterceptor = (content: string, fileId: string): Rresult => {
  const result: Rresult = {
    areInterceptorsInjected: false,
    content,
    functions: [],
  };

  const ast = parse(content, { sourceType: 'module', plugins: ['typescript'] });

  traverse(ast, {
    exit(path) {
      if (path.isArrowFunctionExpression()) {
        if (path.parentPath.isVariableDeclarator()) {
          if (path.parentPath.parentPath.isVariableDeclaration()) {
            const variableDeclarationPath = path.parentPath.parentPath;

            if (t.isExportNamedDeclaration(variableDeclarationPath.parent)) {
              const exportNamedDeclarationNode = variableDeclarationPath.parent;
              const hasTestMagicComment = exportNamedDeclarationNode.leadingComments?.some(({ value }) =>
                MAGIC_COMMENTS_REGEXP.TEST.test(value)
              );
              if (hasTestMagicComment) {
                const name = Object.keys(variableDeclarationPath.getOuterBindingIdentifiers())[0];
                const id = getFunctionId(fileId, name);

                const arrowFunction = generate(path.node);

                result.functions.push({
                  type: FunctionType.Arrow,
                  name,
                  content: arrowFunction.code,
                  id,
                });

                path.replaceWith(createArrowFunctionInterceptor(path.node, id));

                result.areInterceptorsInjected = true;
              }
            }
          }
        }
      }
    },
  });

  if (result.areInterceptorsInjected) {
    result.content = `import { _$LocalProxy } from '@unitless-io/loader/dist/web';\n${generate(ast).code}`;
  }

  return result;
};
