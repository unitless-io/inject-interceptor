export const createInterceptor = (f: string, fileId: string, functionName: string) => {
  return `_$Proxy(${f}, "${fileId}", "${functionName}")`;
};
