import { getFileId, saveFile, saveFunctions } from '@unitless-io/local-db';

import { injectInterceptor } from '@app/interceptor';

export const inject = (content: string, filePath: string) => {
  const fileId = getFileId(filePath);

  const result = injectInterceptor(content, fileId);

  if (!result.areInterceptorsInjected) {
    return content;
  }

  saveFile(filePath, fileId);

  saveFunctions(result.functions);

  return result.content;
};
