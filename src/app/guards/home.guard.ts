import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { HomeGuardService } from '@services/home-guard/home-guard.service';

export const canActivateHome: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(HomeGuardService).canActivate();
}
