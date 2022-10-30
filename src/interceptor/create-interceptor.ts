import * as t from '@babel/types';

export const createArrowFunctionInterceptor = (f: t.ArrowFunctionExpression, id: string) => {
  return t.callExpression(t.identifier('_$LocalProxy'), [f, t.stringLiteral(id)]); // `_$LocalProxy(${f}, "${id}")`
};
