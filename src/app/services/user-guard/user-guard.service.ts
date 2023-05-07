import { Injectable } from '@angular/core';
import { User } from '@models/user';
import { LocalStorageKeysEnum } from '@services/local-storage/enums/local-storage-keys.enums';
import { LocalStorageService } from '@services/local-storage/local-storage.service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserGuardService {

  constructor(private _localStorageService: LocalStorageService) { }

  canActivate(): boolean {
    return !!this._localStorageService.get<User>(LocalStorageKeysEnum.User);
  }
}
