import { Injectable } from '@angular/core';
import { TouristRegister } from '@models/tourist';
import { TouristGuideRegister } from '@models/tourist-guide';
import { User } from '@models/user';
import { ApiService } from '@services/api/api.service';
import { LocalStorageKeysEnum } from '@services/local-storage/enums/local-storage-keys.enums';
import { LocalStorageService } from '@services/local-storage/local-storage.service';
import { BehaviorSubject, Observable, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user$ = new BehaviorSubject<User|null>(null);
  constructor(private _apiService: ApiService, private _localStorageService: LocalStorageService) {
    this.user$.next(this._localStorageService.get(LocalStorageKeysEnum.User));
  }

  isLoggedIn(): Observable<boolean> {
    return this.getUser().pipe(map(user => !!user))
  }

  login(email: string, password: string): Observable<User> {
    return this._apiService.post<User>('/login', {
      email,
      password
    }).pipe(
      map(user => {
        this._localStorageService.set(LocalStorageKeysEnum.User, user);
        this.user$.next(user);
        return user
      })
    )
  }

  registerTouristGuide(touristGuide: TouristGuideRegister): Observable<User> {
    return this._apiService.post('/tourist-guides', touristGuide)
      .pipe(
        switchMap(() => this.login(touristGuide.email, touristGuide.password))
      )
  }

  registerTourist(touristGuide: TouristRegister): Observable<User> {
    return this._apiService.post('/tourists', touristGuide)
      .pipe(
        switchMap(() => this.login(touristGuide.email, touristGuide.password))
      )
  }

  getUser(): Observable<User | null> {
    return this.user$.asObservable();
  }

  logout(): void {
    this._localStorageService.delete(LocalStorageKeysEnum.User);
    this.user$.next(null);
  }
}
