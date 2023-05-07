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

  set(key: LocalStorageKeysEnum, value: any): void {
    this._localStorage.setItem(key, JSON.stringify(value));
  }

  get(key: LocalStorageKeysEnum): void {
    const value = this._localStorage.getItem(key);
    return value ? JSON.parse(value) : null
  }
}

