class ConnectionException extends Error {
    public code:number
    public message: string;

    constructor (message?: string) {
      super(message)
      this.code = 429
      this.message = 'Exceeded connections to your network.'
    }
}

class SintaxeException extends Error {
    public code:number
    public message: string;

    constructor (message?: string) {
      super(message)
      this.code = 406
      this.message = 'Document ID is not invalid.'
    }
}

export { ConnectionException, SintaxeException }
