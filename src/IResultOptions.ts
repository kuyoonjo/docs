import { IDocsDataTypeItem } from './IDocsDataTypeItem';

export interface IResultOptions {
  /**
   * Fields to select.
   * @example
   * '_id name'
   */
  select?: string;

  /**
   * Fields to exlude.
   * @example
   * 'createdAt updatedAt'
   */
  exclude?: string;

  /**
   * Extra fields to append
   */
  extras?: {
    [index: string]: IDocsDataTypeItem;
  };
}
