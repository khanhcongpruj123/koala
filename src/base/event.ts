export class BaseEvent {
  constructor(name: string, data?: any) {
    this.name = name;
    this.data = data;
  }

  name: string;
  data?: any;
}

export class MinusCoinEvent extends BaseEvent {
  constructor(amount: number) {
    super('MINUS_COIN_EVENT', {
      amount: amount,
    });
  }
}
