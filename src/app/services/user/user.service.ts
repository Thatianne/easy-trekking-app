import { Injectable } from '@angular/core';
import { TouristGuideRegister } from '@models/tourist-guide';
import { User } from '@models/user';
import { ApiService } from '@services/api/api.service';
import { LocalStorageKeysEnum } from '@services/local-storage/enums/local-storage-keys.enums';
import { LocalStorageService } from '@services/local-storage/local-storage.service';
import { Observable, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _apiService: ApiService, private _localStorageService: LocalStorageService) { }

  isLoggedIn(): boolean {
    return !!this._localStorageService.get(LocalStorageKeysEnum.User);
  }

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

  registerTouristGuide(touristGuide: TouristGuideRegister): Observable<User> {
    return this._apiService.post('tourist-guide', touristGuide)
      .pipe(
        switchMap(() => this.login(touristGuide.email, touristGuide.password))
      )
  }
}
