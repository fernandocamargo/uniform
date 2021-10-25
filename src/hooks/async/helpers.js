import { PENDING } from './constants';

export class Validity {
  constructor() {
    this.stale = false;
  }

  expire = () => {
    this.stale = true;
  };

  succeed = (...params) => (!this.stale ? Promise.resolve(...params) : PENDING);

  fail = (...params) => (!this.stale ? Promise.reject(...params) : PENDING);

  check = (promise) => {
    const { succeed, fail } = this;

    return promise.then(succeed).catch(fail);
  };
}
