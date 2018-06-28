import { IDocsParameter } from './IDocsParameter';
import { TDocsAccept } from './TDocsAccept';

export interface IDocs {
  /**
   * Path to append to router
   */
  path: string;

  /**
   * HTTP methods
   */
  methods: Array<'post' | 'get' | 'put' | 'patch' | 'delete'>;

  /**
   * Controller function
   */
  controller: (ctx: any) => Promise<any>;

  /**
   * Authentication
   */
  auth?: {
    /**
     * Auth type
     */
    type?:
      | 'attach'
      | 'isAuthenticated'
      | 'owns'
      | 'hasRoles'
      | 'ownsOrHasRoles';

    /**
     * Required when type is hasRoles or ownsOrHasRoles
     */
    roles?: string[];
  };

  /**
   * Swagger ui tags
   */
  tags: string[];

  /**
   * Swagger ui summary
   */
  summary?: string;

  /**
   * Swagger ui description
   */
  description?: string;

  /**
   * Swagger ui consumes
   */
  consumes?: TDocsAccept[];

  /**
   * Swagger ui consumes
   */
  produces?: TDocsAccept[];

  /**
   * Swagger ui parameters
   */
  parameters?: IDocsParameter[];

  /**
   * Swagger ui responses
   */
  responses: {
    [index: string]: {
      description: string;
      schema?: any;
    };
  };
}
