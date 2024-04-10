class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    // Maintaining proper stack trace (for debugging purposes)
    Error.captureStackTrace(this, this.constructor);
  }
}
module.exports = ErrorHandler;
