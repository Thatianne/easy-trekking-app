import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@models/user';
import { UserService } from '@services/user/user.service';
import { Observable, tap } from 'rxjs';
import { RoleEnum } from 'src/app/enums/role.enum';

@Injectable({
  providedIn: 'root',
})
export class HomeGuardService {

  constructor(private _userService: UserService, private _router: Router, private _activatedRoute: ActivatedRoute) {}

  canActivate(): Observable<boolean> {
    this._userService.getUser().pipe(
      tap((user) => {
        if (user) {
          this.redirectToMainPage(user);
        }
      })
    ).subscribe();

    return this._userService.isLoggedIn();
  }

  redirectToMainPage(user: User): void {
    if (user.role.id === RoleEnum.Administrator) {
      this._router.navigate(['/admin/trekkings'])
    } else if (user.role.id === RoleEnum.TouristGuide) {
      this._router.navigate(['/tourist-guide/trekkings'])
    } else {
      this._router.navigate(['/trekkings'])
    }
  }
}
