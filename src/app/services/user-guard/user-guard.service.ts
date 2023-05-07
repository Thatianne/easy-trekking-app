import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuardService {

  constructor(private _userService: UserService, private _router: Router) { }

  canActivate(): boolean {
    if (!this._userService.isLoggedIn()) {
      this._router.navigateByUrl('/login');
      return false;
    }

    return true
  }
}
