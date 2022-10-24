import { getFileId } from './get-file-id';

describe('getFileId', () => {
  test.each`
    filePath               | expected
    ${'/test/test.test'}   | ${'-test-test.test'}
    ${'/.test/test.test'}  | ${'-.test-test.test'}
    ${'test/test.test.ts'} | ${'test-test.test.ts'}
    ${'\\test\\test.test'} | ${'-test-test.test'}
  `('returns file id: "$expected" when filePath: "$filePath"', ({ filePath, expected }) => {
    expect(getFileId(filePath)).toBe(expected);
  });
});
