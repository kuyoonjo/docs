import { mm2ssd } from '@ycnt/mm2ssd';
import * as _ from 'lodash';
import { IDocsDataTypeItem } from './IDocsDataTypeItem';
import { IDocsParameter } from './IDocsParameter';
import { IResultOptions } from './IResultOptions';
import { IDocsDataTypeProperties } from './IDocsDataTypeProperties';
import { PAGINATE_RESULT } from './constants';

/**
 * DocSchema class
 */
export class DocSchema {
  public schema: IDocsDataTypeItem;
  public filters: IDocsParameter;
  public body: IDocsParameter;
  public result: IDocsDataTypeItem;
  public paginateResult: IDocsDataTypeItem;

  constructor(private model: any) {
    this.schema = model2Schema(this.model);
    let str = '\n    {\n';
    str += Object.keys(this.schema.properties as any)
      .map(k => `      ${k}: {}`)
      .join(',\n');
    str += '\n    }\n';
    this.filters = {
      description: str,
      in: 'query',
      name: '_filters',
    };

    this.body = {
      in: 'body',
      name: 'body',
      schema: this.schema,
    };

    this.result = _.merge(
      {
        properties: {
          _id: { type: 'string' },
          __v: { type: 'string' },
        },
      },
      this.schema
    );

    this.paginateResult = _.merge({}, PAGINATE_RESULT, {
      properties: {
        docs: {
          type: 'array',
          items: _.merge({}, this.result, { xml: { name: 'item' } }),
        },
      },
    });
  }

  /**
   * Result with options
   */
  public resultWithOptions = (options: IResultOptions): IDocsDataTypeItem => {
    const result = _.merge({}, this.result) as any;
    const properties = result.properties as any;
    if (typeof options.select === 'string') {
      result.properties = {};
      for (const k of options.select.split(' ')) {
        if (k) result.properties[k] = properties[k];
      }
    } else if (typeof options.exclude === 'string') {
      for (const k of options.exclude.split(' ')) {
        if (k) delete result.properties[k];
      }
    }
    if (options.extras) _.merge(result.properties, options.extras);
    return result;
  };

  /**
   * Paginated result with options
   */
  public paginateResultWithOptions = (
    options: IResultOptions
  ): IDocsDataTypeItem => {
    return _.merge({}, PAGINATE_RESULT, {
      properties: {
        docs: {
          type: 'array',
          items: _.merge({}, this.resultWithOptions(options), {
            xml: { name: 'item' },
          }),
        },
      },
    });
  };

  /**
   * Body whit options
   */
  public bodyWithOptions = (options: IResultOptions): IDocsParameter => {
    const schema = _.merge({}, this.body.schema) as any;
    const body = _.merge({}, this.body);
    const properties: IDocsDataTypeProperties = schema.properties;
    if (typeof options.select === 'string') {
      schema.properties = {};
      for (const k of options.select.split(' ')) {
        if (k) schema.properties[k] = properties[k];
      }
    } else if (typeof options.exclude === 'string') {
      for (const k of options.exclude.split(' ')) {
        if (k) delete schema.properties[k];
      }
    }
    if (options.extras) _.merge(schema.properties, options.extras);
    body.schema = schema;
    return body;
  };
}

/**
 * Convert mongoose paginate model to Swagger ui schema
 * @param model {IModel} Ycs model
 */
export function model2Schema(model: any): IDocsDataTypeItem {
  return mm2ssd(model, 'xml');
}
