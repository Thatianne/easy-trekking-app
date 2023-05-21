import { Injectable } from '@angular/core';
import { LocalStorageKeysEnum } from './enums/local-storage-keys.enums';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private _localStorage: Storage;

  constructor() {
    this._localStorage = localStorage;
  }

  set<T>(key: LocalStorageKeysEnum, value: T): void {
    this._localStorage.setItem(key, JSON.stringify(value));
  }

  get<T>(key: LocalStorageKeysEnum): T {
    const value = this._localStorage.getItem(key);
    return value ? JSON.parse(value) : null
  }

  delete(key: LocalStorageKeysEnum): void {
    this._localStorage.removeItem(key);
  }
}

