export class Result<T> {
  success: boolean;
  data?: T;
  message?: string;
  errorcode?: Number

  private constructor(success: boolean, data?: T, message?: string, errorcode?: number) {
    this.success = success;
    this.data = data;
    this.message = message;
    this.errorcode= errorcode
  }

  static ok<U>(data: U): Result<U> {
    return new Result<U>(true, data);
  }

  static fail<U>(message: string, errorcode: number): Result<U> {
    return new Result<U>(false, undefined, message, errorcode );
  }
}
