export const createInterceptor = (f: string, id: string) => {
  return `_$LocalProxy(${f}, "${id}")`;
};
