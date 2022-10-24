import { getFunctionId, parseFunctionId } from './function-id';

describe('getFunctionId', () => {
  test.each`
    fileId                 | functionName       | expected
    ${'-test-test.test'}   | ${'testFunction'}  | ${'-test-test.test@_@testFunction'}
    ${'test-test.test.ts'} | ${'testFunction2'} | ${'test-test.test.ts@_@testFunction2'}
  `(
    'returns Function id: "$expected" when fileId: "$fileId" and functionName: "$functionName"',
    ({ fileId, functionName, expected }) => {
      expect(getFunctionId(fileId, functionName)).toBe(expected);
    }
  );
});

describe('parseFunctionId', () => {
  test.each`
    functionId                             | expected
    ${'-test-test.test@_@testFunction'}    | ${{ fileId: '-test-test.test', functionName: 'testFunction' }}
    ${'test-test.test.ts@_@testFunction2'} | ${{ fileId: 'test-test.test.ts', functionName: 'testFunction2' }}
  `('returns fileId and functionName: "$expected" when functionId: "$functionId"', ({ functionId, expected }) => {
    expect(parseFunctionId(functionId)).toEqual(expected);
  });
});
