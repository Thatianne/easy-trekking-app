import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root',
})
export class ScreenResolutionService {
  constructor(public _breakpointObserver: BreakpointObserver) {}

  isMobile(): Observable<boolean> {
    return this._breakpointObserver
      .observe([Breakpoints.XSmall])
      .pipe(
        tap((state: BreakpointState) => console.log(state)),
        map((state: BreakpointState) => state.matches)
      );
  }
}
