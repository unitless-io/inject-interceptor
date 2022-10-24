const SEPARATOR = '@_@';

export const getFunctionId = (fileId: string, functionName: string) => {
  return `${fileId}${SEPARATOR}${functionName}`;
};

export const parseFunctionId = (functionId: string) => {
  const [fileId, functionName] = functionId.split(SEPARATOR);

  return { fileId, functionName };
};
