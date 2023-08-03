export default class ApiError extends Error {
  public statusCode: string | number;

  constructor(statusCode: string | number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}
