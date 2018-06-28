import { DocSchema } from '../src/docs';
import { model, Schema } from 'mongoose';

console.log = jest.fn();
console.error = jest.fn();

describe('test class DocSchema', () => {
  const m = model(
    'test',
    new Schema({
      name: String,
      info: String,
    })
  );
  const docSchema = new DocSchema(m);

  // 1. test get schema()
  it('should match schema', () => {
    expect(docSchema.schema).toMatchObject({
      properties: {
        __v: {
          format: 'int64',
          required: false,
          type: 'integer',
        },
        _id: {
          required: false,
          type: 'string',
        },
        info: {
          required: false,
          type: 'string',
        },
        name: {
          required: false,
          type: 'string',
        },
      },
      required: [],
      type: 'object',
      xml: {
        name: 'xml',
      },
    });
  });

  // 2. test get filters()
  it('should match filters', () => {
    const filters = docSchema.filters;
    // 2.1  __filters is false
    expect(filters).toMatchObject({
      in: 'query',
      name: '_filters',
    });
    expect(filters.description).toMatch(/name: \{\}/);
    expect(filters.description).toMatch(/info: \{\}/);
  });

  // 3. test  get result()
  it('should match result', () => {
    expect(docSchema.result).toMatchObject({
      properties: {
        __v: {
          format: 'int64',
          required: false,
          type: 'integer',
        },
        _id: {
          required: false,
          type: 'string',
        },
        info: {
          required: false,
          type: 'string',
        },
        name: {
          required: false,
          type: 'string',
        },
      },
      required: [],
      type: 'object',
      xml: {
        name: 'xml',
      },
    });
  });

  // 4. test get paginateResult()
  it('should match paginateResult', () => {
    const paginateResult = docSchema.paginateResult;
    // 4.1  paginateResult is false
    expect(paginateResult).toEqual({
      properties: {
        docs: {
          type: 'array',
          items: {
            properties: {
              __v: {
                format: 'int64',
                required: false,
                type: 'integer',
              },
              _id: {
                required: false,
                type: 'string',
              },
              info: {
                required: false,
                type: 'string',
              },
              name: {
                required: false,
                type: 'string',
              },
            },
            required: [],
            type: 'object',
            xml: {
              name: 'item',
            },
          },
        },
        limit: {
          type: 'number',
        },
        next: {
          type: 'number',
        },
        offset: {
          type: 'number',
        },
        page: {
          type: 'number',
        },
        pages: {
          type: 'number',
        },
        prev: {
          type: 'number',
        },
        total: {
          type: 'number',
        },
      },
      type: 'object',
      xml: {
        name: 'xml',
      },
    });
  });

  // 5. test resultWithOptions(options: IResultOptions)
  it('should match resultWithOptions', () => {
    // 5.1 test with 空对象
    const iResultOptions = {};
    const resultWithOptions = docSchema.resultWithOptions(iResultOptions);
    expect(resultWithOptions).toEqual({
      properties: {
        __v: {
          format: 'int64',
          required: false,
          type: 'integer',
        },
        _id: {
          required: false,
          type: 'string',
        },
        info: {
          required: false,
          type: 'string',
        },
        name: {
          required: false,
          type: 'string',
        },
      },
      required: [],
      type: 'object',
      xml: {
        name: 'xml',
      },
    });
    // 5.2 test with select data
    const iResultOptions2 = {
      select: 'name  age',
      exclude: 'info',
    };
    const resultWithOptions2 = docSchema.resultWithOptions(iResultOptions2);
    expect(resultWithOptions2).toEqual({
      properties: {
        name: {
          required: false,
          type: 'string',
        },
        age: undefined,
      },
      required: [],
      type: 'object',
      xml: {
        name: 'xml',
      },
    });

    // 5.3 test key: exclude
    const iResultOptions3 = {
      exclude: 'name   age',
      extras: {},
    };
    const resultWithOptions3 = docSchema.resultWithOptions(iResultOptions3);
    expect(resultWithOptions3).toEqual({
      properties: {
        __v: {
          format: 'int64',
          required: false,
          type: 'integer',
        },
        _id: {
          required: false,
          type: 'string',
        },
        info: {
          required: false,
          type: 'string',
        },
      },
      required: [],
      type: 'object',
      xml: {
        name: 'xml',
      },
    });
  });

  // 6. test paginateResultWithOptions(options: IResultOptions)
  it('should match paginateResultWithOptions', () => {
    // 6.1 test with 空对象
    const resultWithOptions1 = {};
    const options = docSchema.paginateResultWithOptions(resultWithOptions1);
    expect(options).toEqual({
      properties: {
        limit: {
          type: 'number',
        },
        next: {
          type: 'number',
        },
        offset: {
          type: 'number',
        },
        page: {
          type: 'number',
        },
        pages: {
          type: 'number',
        },
        prev: {
          type: 'number',
        },
        total: {
          type: 'number',
        },
        docs: {
          type: 'array',
          items: {
            properties: {
              __v: {
                format: 'int64',
                required: false,
                type: 'integer',
              },
              _id: {
                required: false,
                type: 'string',
              },
              info: {
                required: false,
                type: 'string',
              },
              name: {
                required: false,
                type: 'string',
              },
            },
            required: [],
            type: 'object',
            xml: {
              name: 'item',
            },
          },
        },
      },
      type: 'object',
      xml: {
        name: 'xml',
      },
    });
    // 6.2 test with select
    const resultWithOptions2 = {
      select: 'name info',
    };
    const options2 = docSchema.paginateResultWithOptions(resultWithOptions2);
    expect(options2).toEqual({
      properties: {
        limit: {
          type: 'number',
        },
        next: {
          type: 'number',
        },
        offset: {
          type: 'number',
        },
        page: {
          type: 'number',
        },
        pages: {
          type: 'number',
        },
        prev: {
          type: 'number',
        },
        total: {
          type: 'number',
        },
        docs: {
          type: 'array',
          items: {
            properties: {
              info: {
                required: false,
                type: 'string',
              },
              name: {
                required: false,
                type: 'string',
              },
            },
            required: [],
            type: 'object',
            xml: {
              name: 'item',
            },
          },
        },
      },
      type: 'object',
      xml: {
        name: 'xml',
      },
    });
  });

  // 10. test get body()
  it('test get body()', () => {
    // 10.1 body is false
    expect(docSchema.body).toMatchObject({
      in: 'body',
      name: 'body',
      schema: {
        properties: {
          __v: {
            format: 'int64',
            required: false,
            type: 'integer',
          },
          _id: {
            required: false,
            type: 'string',
          },
          info: {
            required: false,
            type: 'string',
          },
          name: {
            required: false,
            type: 'string',
          },
        },
        required: [],
        type: 'object',
        xml: {
          name: 'xml',
        },
      },
    });
    expect(docSchema.bodyWithOptions({})).toMatchObject({
      in: 'body',
      name: 'body',
      schema: {
        properties: {
          __v: {
            format: 'int64',
            required: false,
            type: 'integer',
          },
          _id: {
            required: false,
            type: 'string',
          },
          info: {
            required: false,
            type: 'string',
          },
          name: {
            required: false,
            type: 'string',
          },
        },
        required: [],
        type: 'object',
        xml: {
          name: 'xml',
        },
      },
    });
    expect(docSchema.bodyWithOptions({ select: 'name info' })).toMatchObject({
      in: 'body',
      name: 'body',
      schema: {
        properties: {
          info: {
            required: false,
            type: 'string',
          },
          name: {
            required: false,
            type: 'string',
          },
        },
        required: [],
        type: 'object',
        xml: {
          name: 'xml',
        },
      },
    });
    expect(docSchema.bodyWithOptions({ select: 'name  info' })).toMatchObject({
      in: 'body',
      name: 'body',
      schema: {
        properties: {
          info: {
            required: false,
            type: 'string',
          },
          name: {
            required: false,
            type: 'string',
          },
        },
        required: [],
        type: 'object',
        xml: {
          name: 'xml',
        },
      },
    });
    expect(
      docSchema.bodyWithOptions({ exclude: '__v  _id', extras: {} })
    ).toMatchObject({
      in: 'body',
      name: 'body',
      schema: {
        properties: {
          info: {
            required: false,
            type: 'string',
          },
          name: {
            required: false,
            type: 'string',
          },
        },
        required: [],
        type: 'object',
        xml: {
          name: 'xml',
        },
      },
    });
  });
});
