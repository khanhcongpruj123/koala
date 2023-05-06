import { KoalaException } from 'src/base/error.interface';

export class NotEnoughtCoinException extends KoalaException {
  constructor() {
    super('You do not have enought coin', 'NOT_ENOUGHT_COIN');
  }
}
