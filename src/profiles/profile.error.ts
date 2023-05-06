import { KoalaException } from 'src/base/error.interface';

export class ProfileIsExisted extends KoalaException {
  constructor() {
    super('PROFILE_IS_EXISTED', 'Profile is existed');
  }
}

export class NameIsExisted extends KoalaException {
  constructor() {
    super('NAME_IS_EXISTED', 'Name is existed');
  }
}
