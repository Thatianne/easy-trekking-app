import { Component, OnInit } from '@angular/core';
import { Observable, first } from 'rxjs';
import { ScreenResolutionService } from '@services/screen-resolution/screen-resolution.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '@services/user/user.service';
import { Router } from '@angular/router';
import { User } from '@models/user';
import { RoleEnum } from 'src/app/enums/role.enum';
import { HomeGuardService } from '@services/home-guard/home-guard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isMobile$: Observable<boolean>;
  form!: FormGroup;

  constructor(
    private _screeResolutionService: ScreenResolutionService,
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _homeGuardService: HomeGuardService,
    private _router: Router
  ) {
    this.isMobile$ = this._screeResolutionService.isMobile();
  }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })

    if (this._userService.isLoggedIn()) {
      this._userService.getUser()
        .subscribe(user => {
          if (user) {
            this._homeGuardService.redirectToMainPage(user);
          }
        })
    }
  }

  onSubmit(): void {
    const { controls } = this.form;

    if (this.form.invalid) {
      return;
    }

    this._userService.login(controls['email'].value, controls['password'].value)
      .pipe(first())
      .subscribe(user => {
        this._homeGuardService.redirectToMainPage(user);
      })
  }
}
