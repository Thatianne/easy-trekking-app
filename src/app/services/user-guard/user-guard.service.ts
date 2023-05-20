import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@services/user/user.service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserGuardService {

  constructor(private _userService: UserService, private _router: Router) {}

  canActivate(): Observable<boolean> {
    return this._userService.isLoggedIn().pipe(
      tap((isLoggedIn) => {
        if (!isLoggedIn) {
          this._router.navigateByUrl('/login');
        }
      })
    );
  }
}
