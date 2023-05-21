import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MustMatch } from '@helpers/must-match';
import { Association } from '@models/association';
import { RegisterSteps } from '@pages/tourist-guide-register/enums/register-steps.enum';
import { ScreenResolutionService } from '@services/screen-resolution/screen-resolution.service';
import { UserService } from '@services/user/user.service';
import { Observable } from 'rxjs';
import { DocumentTypeEnum } from 'src/app/enums/document-type.enum';

@Component({
  selector: 'app-tourist-register',
  templateUrl: './tourist-register.component.html',
  styleUrls: ['./tourist-register.component.scss'],
})
export class TouristRegisterComponent {
  isMobile$: Observable<boolean>;
  associations$: Observable<Association[]> = new Observable();
  step: RegisterSteps = RegisterSteps.First;
  stepEnums = RegisterSteps;
  formFirst = this._formBuilder.group(
    {
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      document: ['', [Validators.required]],
      address: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirmation: [
        '',
        [Validators.required, Validators.minLength(6)],
      ],
    },
    {
      validators: MustMatch('password', 'passwordConfirmation'),
    }
  );
  submittedFirst = false;

  constructor(
    private _screeResolutionService: ScreenResolutionService,
    private _formBuilder: NonNullableFormBuilder,
    private _userService: UserService,
    private _router: Router
  ) {
    this.isMobile$ = this._screeResolutionService.isMobile();
  }

  onSubmit(e: MouseEvent): void {
    e.preventDefault();
    this.submittedFirst = true;
    if (this.formFirst.invalid) {
      return;
    }
    const { controls } = this.formFirst;
    const subscription = this._userService
      .registerTourist({
        email: controls.email.value,
        name: controls.name.value,
        phone: controls.phone.value,
        documents: [
          { type: DocumentTypeEnum.CPF, value: controls.document.value },
        ],
        password: controls.password.value,
      })
      .subscribe(() => {
        this._router.navigate(['/trekkings']);
        subscription.unsubscribe();
      });
  }

  get firstControls() {
    return this.formFirst.controls;
  }
}
