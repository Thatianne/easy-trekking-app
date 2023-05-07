import { Injectable } from '@angular/core';
import { User } from '@models/user';
import { ApiService } from '@services/api/api.service';
import { LocalStorageKeysEnum } from '@services/local-storage/enums/local-storage-keys.enums';
import { LocalStorageService } from '@services/local-storage/local-storage.service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _apiService: ApiService, private _localStorageService: LocalStorageService) { }

  login(email: string, password: string): Observable<User> {
    return this._apiService.post<User>('/login', {
      email,
      password
    }).pipe(
      map(user => {
        this._localStorageService.set(LocalStorageKeysEnum.User, user);
        return user
      })
    )
  }

  isLoggedIn(): boolean {
    return !!this._localStorageService.get(LocalStorageKeysEnum.User);
  }
}
