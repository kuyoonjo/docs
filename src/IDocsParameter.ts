import { TDocsDataType } from './TDocsDataType';
import { IDocsDataTypeItem } from './IDocsDataTypeItem';

export interface IDocsParameter {
  in: 'body' | 'query' | 'formData' | 'path';
  name: string;
  type?: TDocsDataType;
  items?: {
    type: TDocsDataType;
  };
  properties?: {
    [index: string]: {
      type: TDocsDataType;
    };
  };
  summary?: string;
  description?: string;
  required?: boolean;
  schema?: IDocsDataTypeItem;
}
