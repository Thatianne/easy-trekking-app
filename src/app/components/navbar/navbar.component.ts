import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@models/user';
import { UserService } from '@services/user/user.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { RoleEnum } from 'src/app/enums/role.enum';

interface MenuOption {
  label: string;
  link: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  user$!: Observable<User | null>;
  menuOptions$ = new BehaviorSubject<MenuOption[]>([]);

  constructor(private _userService: UserService, private _router: Router) {}

  ngOnInit(): void {
    this.user$ = this._userService.getUser();

    this.user$.subscribe((user) => {
      if (user?.role.id) {
        if (user.role.id === RoleEnum.Administrator) {
          this.menuOptions$.next([
            {
              label: 'Trekkings',
              link: 'admin/trekkings',
            },
            {
              label: 'Grupos',
              link: 'admin/groups',
            },
            {
              label: 'Tarefas',
              link: 'admin/automated-tasks',
            },
          ]);
        } else {
          this.menuOptions$.next([]);
        }
      }
    });
  }

  onLogout(): void {
    this._userService.logout();
    this._router.navigate(['/login']);
  }
}
