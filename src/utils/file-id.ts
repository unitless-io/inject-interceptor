export const getFileId = (filePath: string) => {
  return filePath.replaceAll(/[\\/]/g, '-');
};
