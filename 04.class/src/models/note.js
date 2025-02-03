export default class Note {
  constructor(id, title, body) {
    this._id = id;
    this._title = title;
    this._body = body;
  }

  get id() {
    return this._id;
  }

  get title() {
    return this._title;
  }

  get body() {
    return this._body;
  }
}
