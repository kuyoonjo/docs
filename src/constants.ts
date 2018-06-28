import { IDocsParameter } from './IDocsParameter';
import { IDocsDataTypeItem } from './IDocsDataTypeItem';

export const PAGINATE_OPTIONS: IDocsParameter = {
  description: `More info at [https://www.npmjs.com/package/mongoose-paginate](https://www.npmjs.com/package/mongoose-paginate)
  <br />

    {
      "lean": Boolean,
      "leanWithId": Boolean,
      "limit": Number,
      "offset": Number,
      "page": Number,
      "populate": String,
      "select": String,
      "sort": String
    }
    `,
  in: 'query',
  name: '_options',
};

export const PAGINATE_RESULT: IDocsDataTypeItem = {
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
  },
  type: 'object',
  xml: {
    name: 'xml',
  },
};

export const SHOW_OPTIONS: IDocsParameter = {
  description: `
    {
      "select": String,
      "populate": String
    }
    `,
  in: 'query',
  name: '_options',
};

export const PARAM_ID: IDocsParameter = {
  description: 'Unique id',
  in: 'path',
  name: 'id',
  required: true,
  type: 'string',
};

export const RESPONSE_4XX = {
  description: 'Client side errors',
};

export const RESPONSE_5XX = {
  description: 'Server side errors',
};
