import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { UserGuardService } from '@services/user-guard/user-guard.service';
import { inject } from '@angular/core';

export const canActivateUser: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(UserGuardService).canActivate();
}
