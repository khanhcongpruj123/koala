export class KoalaException implements Error {
  name: string;
  message: string;
  stack?: string;
  code: string;

  constructor(message: string, code: string) {
    this.message = message;
    this.code = code;
  }
}
