declare module 'youch' {
  class Youch<Error, Request> {
    constructor(error: Error, request: Request);

    /**
     * Stores the link `callback` which
     * will be processed when rendering
     * the HTML view.
     *
     * @param {Function} callback
     *
     * @returns {this}
     */
    addLink(callback: Function): this;

    /**
     * Returns error stack as JSON.
     *
     * @return {Promise}
     */
    toJSON(): Promise<any>;

    /**
     * Returns HTML representation of the error stack
     * by parsing the stack into frames and getting
     * important info out of it.
     *
     * @return {Promise}
     */
    toHTML(): Promise<string>;
  }

  export default Youch;
}
