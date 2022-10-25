import MD5 from 'md5.js';

export const getFileId = (filePath: string) => {
  return new MD5().update(filePath).digest('hex');
};
