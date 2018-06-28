import { IDocsDataTypeProperties } from './IDocsDataTypeProperties';
import { TDocsDataType } from './TDocsDataType';
import { TDocsDataFormat } from './TDocsDataFormat';

export interface IDocsDataTypeItem {
  type: TDocsDataType;
  format?: TDocsDataFormat;

  /**
   * Required when type is array
   */
  items?: IDocsDataTypeItem;

  /**
   * Required when type is object
   */
  properties?: IDocsDataTypeProperties;
  description?: string;
  required?: boolean;
  xml?: {
    name: string;
  };
}
