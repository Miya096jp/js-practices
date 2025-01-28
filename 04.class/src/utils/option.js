export default class Option {
  constructor(argv) {
    this._list = argv["l"] || false;
    this._read = argv["r"] || false;
    this._delete = argv["d"] || false;
  }

  get list() {
    return this._list;
  }

  get read() {
    return this._read;
  }

  get delete() {
    return this._delete;
  }
}
