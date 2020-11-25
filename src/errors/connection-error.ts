import { CustomError } from './custom-errors'
export class ConnectionError extends CustomError {
  statusCode = 500
  reason = "Error connecting to reddit"
  constructor() {
    super('Error connecting to reddit')

    Object.setPrototypeOf(this, ConnectionError.prototype)
  }

  serializeErrors() {
    return [
      {
        message: this.reason,
      },
    ]
  }
}
