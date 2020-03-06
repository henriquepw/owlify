declare module 'youch' {
  class Youch<Error, Request> {
    constructor(error: Error, request: Request);

    /**
     * Returns error stack as JSON.
     *
     * @return {Promise}
     */
    toJSON(): Promise<object>;
  }

  export default Youch;
}
