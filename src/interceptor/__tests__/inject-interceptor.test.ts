import path from 'path';
import fs from 'fs';

import { injectInterceptor } from '../inject-interceptor';
import { jsTests } from './__fixtures__/js';
import { tsTests } from './__fixtures__/ts';

const readFile = (...args: string[]) => fs.readFileSync(path.resolve(__dirname, './__fixtures__/', ...args), 'utf8');

describe('injectInterceptor', () => {
  test.each(jsTests)('js test $fileIndex', ({ fileIndex, fileId, expected }) => {
    expect(injectInterceptor(readFile('js', `${fileIndex}.0`), fileId)).toEqual({
      ...expected,
      content: readFile('js', `${fileIndex}.1`),
    });
  });

  test.each(tsTests)('ts test $fileIndex', ({ fileIndex, fileId, expected }) => {
    expect(injectInterceptor(readFile('ts', `${fileIndex}.0`), fileId)).toEqual({
      ...expected,
      content: readFile('ts', `${fileIndex}.1`),
    });
  });
});
