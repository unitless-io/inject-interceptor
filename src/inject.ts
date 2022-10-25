import fs from 'fs';
import path from 'path';

import { getFileId } from '@app/utils';
import { injectInterceptor } from '@app/interceptor';

export const inject = (content: string, filePath: string, roootPath: string = process.cwd()) => {
  const fileId = getFileId(filePath);

  const result = injectInterceptor(content, fileId);

  if (!result.areInterceptorsInjected) {
    return content;
  }

  const cacheFolderPath = path.join(roootPath, 'node_modules', '.cache', '@unitless-io', 'files');

  const filesMetaFilePath = path.join(cacheFolderPath, 'meta.json');

  fs.mkdirSync(cacheFolderPath, { recursive: true });

  let metaJson: Record<string, string> = {};

  if (fs.existsSync(filesMetaFilePath)) {
    metaJson = JSON.parse(fs.readFileSync(filesMetaFilePath, 'utf8'));
  }

  metaJson[fileId] = filePath;

  fs.writeFileSync(filesMetaFilePath, JSON.stringify(metaJson));

  const fileFolderPath = path.join(cacheFolderPath, fileId);

  result.functions.forEach(({ name, content }) => {
    fs.mkdirSync(path.join(fileFolderPath, name), { recursive: true });
    fs.writeFileSync(path.join(fileFolderPath, name, 'meta.json'), JSON.stringify({ content }));
  });

  return result.content;
};
