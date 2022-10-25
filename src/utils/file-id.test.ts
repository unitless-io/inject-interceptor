import { getFileId } from './file-id';

describe('getFileId', () => {
  test.each`
    filePath               | expected
    ${'/test/test.test'}   | ${'782c377efeb147898be15afbd589d8d6'}
    ${'/.test/test.test'}  | ${'8328c79ba5b0f31881d01b3dd3893881'}
    ${'test/test.test.ts'} | ${'d48af07c393f76db8aadad0fbf60b557'}
    ${'\\test\\test.test'} | ${'064cbad35bcb356a84cd83a8f7bbbe08'}
  `('returns file id: "$expected" when filePath: "$filePath"', ({ filePath, expected }) => {
    expect(getFileId(filePath)).toBe(expected);
  });
});
