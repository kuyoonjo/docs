import { TDocsAccept } from './TDocsAccept';

export interface IConfig {
  /**
   * Swagger ui path
   */
  path: string;

  /**
   * Swagger ui options
   */
  options: {
    /**
     * Swagger ui version
     * @example
     * '2.0'
     */
    swagger: string;

    /**
     * Swagger ui info
     */
    info: {
      title: string;
      description: string;

      /**
       * Document version
       */
      version: string;
      contact: {
        email: string;
      };

      /**
       * license
       */
      license?: {
        /**
         * @example
         * Apache 2.0
         */
        name: string;

        /**
         * @example
         * http://www.apache.org/licenses/LICENSE-2.0.html
         */
        url: string;
      };
    };

    /**
     * Server host name
     * @example
     * example.com:8080
     */
    host: string;

    /**
     * Schemes
     * @example
     * ['http', 'https']
     */
    schemes: string[];

    /**
     * Swagger ui base path
     * @example
     * '/'
     */
    basePath: string;

    /**
     * Swagger ui produces
     */
    produces: TDocsAccept[];
  };
}
