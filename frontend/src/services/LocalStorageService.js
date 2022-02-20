class LocalStorageService {
  constructor() {
    this.storage = window.localStorage;
  }

  get(key) {
    return JSON.parse(this.storage.getItem(key));
  }

  set(key, value) {
    this.storage.setItem(key, JSON.stringify(value));
  }

  remove(key) {
    this.storage.removeItem(key);
  }
}

export default LocalStorageService;
