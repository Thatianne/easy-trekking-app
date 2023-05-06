import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ScreenResolutionService } from '@services/screen-resolution.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isMobile$: Observable<boolean>;

  constructor(private _screeResolutionService: ScreenResolutionService) {
    this.isMobile$ = this._screeResolutionService.isMobile();
  }
}
