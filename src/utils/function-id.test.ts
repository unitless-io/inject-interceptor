import { getFunctionId, parseFunctionId } from './function-id';

describe('getFunctionId', () => {
  test.each`
    fileId                                | functionName       | expected
    ${'064cbad35bcb356a84cd83a8f7bbbe08'} | ${'testFunction'}  | ${'064cbad35bcb356a84cd83a8f7bbbe08@_@testFunction'}
    ${'064cbad35bcb356a84cd83a8f7bbbe08'} | ${'testFunction2'} | ${'064cbad35bcb356a84cd83a8f7bbbe08@_@testFunction2'}
  `(
    'returns Function id: "$expected" when fileId: "$fileId" and functionName: "$functionName"',
    ({ fileId, functionName, expected }) => {
      expect(getFunctionId(fileId, functionName)).toBe(expected);
    }
  );
});

describe('parseFunctionId', () => {
  test.each`
    functionId                                            | expected
    ${'064cbad35bcb356a84cd83a8f7bbbe08@_@testFunction'}  | ${{ fileId: '064cbad35bcb356a84cd83a8f7bbbe08', functionName: 'testFunction' }}
    ${'064cbad35bcb356a84cd83a8f7bbbe08@_@testFunction2'} | ${{ fileId: '064cbad35bcb356a84cd83a8f7bbbe08', functionName: 'testFunction2' }}
  `('returns fileId and functionName: "$expected" when functionId: "$functionId"', ({ functionId, expected }) => {
    expect(parseFunctionId(functionId)).toEqual(expected);
  });
});
