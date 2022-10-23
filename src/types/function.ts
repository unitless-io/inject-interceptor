import { FunctionType } from '@app/constants';

export interface Function {
  filePath: string;
  hashId: string;
  type: FunctionType;
  name: string;
  content: string;
}
