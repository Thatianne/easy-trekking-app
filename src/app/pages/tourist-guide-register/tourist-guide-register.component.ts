import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ScreenResolutionService } from '@services/screen-resolution/screen-resolution.service';
import { UserService } from '@services/user/user.service';
import { Observable } from 'rxjs';
import { RegisterSteps } from './enums/register-steps.enum';
import { DocumentTypeEnum } from 'src/app/enums/document-type.enum';

@Component({
  selector: 'app-tourist-guide-register',
  templateUrl: './tourist-guide-register.component.html',
  styleUrls: ['./tourist-guide-register.component.scss'],
})
export class TouristGuideRegisterComponent {
  isMobile$: Observable<boolean>;
  step: RegisterSteps = RegisterSteps.First;
  stepEnums = RegisterSteps;
  formFirst = this._formBuilder.group({
    email: ['', Validators.required],
    name: ['', Validators.required],
    phone: ['', Validators.required],
    document: ['', Validators.required],
    address: ['']
  });
  formSecond = this._formBuilder.group({
    association: [0, Validators.required],
    associationCard: ['', Validators.required],
    password: ['', Validators.required],
    passwordConfirmation: ['', Validators.required]
  });

  constructor(
    private _screeResolutionService: ScreenResolutionService,
    private _formBuilder: NonNullableFormBuilder,
    private _userService: UserService
  ) {
    this.isMobile$ = this._screeResolutionService.isMobile();
  }

  onSubmit(): void {
    if (this.formFirst.invalid && this.formSecond.invalid) {
      return;
    }
    const { controls: constrolsFirst } = this.formFirst
    const { controls: constrolsSecond } = this.formSecond
    this._userService.registerTouristGuide({
      email: constrolsFirst.email.value,
      name: constrolsFirst.name.value,
      phone: constrolsFirst.name.value,
      documents: [
        { type: DocumentTypeEnum.CPF, value: constrolsFirst.name.value},
        { type: DocumentTypeEnum.AssociationCard, value: constrolsFirst.name.value}
      ],
      password: constrolsSecond.password.value,
      associations: [constrolsSecond.association.value],
    })
  }

  nextStep(): void {
    this.step = RegisterSteps.Second;
  }

}
