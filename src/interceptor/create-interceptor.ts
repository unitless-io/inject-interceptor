export const createInterceptor = (f: string, id: string) => {
  return `_$Proxy(${f}, "${id}")`;
};
