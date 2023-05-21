import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@services/user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private _userService: UserService, private _router: Router){}

  onLogout(): void {
    this._userService.logout();
    this._router.navigate(['/login']);
  }
}
