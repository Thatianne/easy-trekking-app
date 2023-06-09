import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ScreenResolutionService } from '@services/screen-resolution/screen-resolution.service';
import { UserService } from '@services/user/user.service';
import { Observable } from 'rxjs';
import { RegisterSteps } from './enums/register-steps.enum';
import { DocumentTypeEnum } from 'src/app/enums/document-type.enum';

import { MustMatch } from '@helpers/must-match';
import { Association } from '@models/association';
import { AssociationService } from '@services/association/association.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tourist-guide-register',
  templateUrl: './tourist-guide-register.component.html',
  styleUrls: ['./tourist-guide-register.component.scss'],
})
export class TouristGuideRegisterComponent implements OnInit {
  isMobile$: Observable<boolean>;
  associations$: Observable<Association[]> = new Observable();
  step: RegisterSteps = RegisterSteps.First;
  stepEnums = RegisterSteps;
  formFirst = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    document: ['', [Validators.required]],
    address: ['', [Validators.required]]
  });
  submittedFirst = false;
  formSecond = this._formBuilder.group({
    association: [0, [Validators.required]],
    associationCard: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    passwordConfirmation: ['', [Validators.required, Validators.minLength(6)]]
  }, {
    validators: MustMatch('password', 'passwordConfirmation')
  });
  submittedSecond = false;

  constructor(
    private _screeResolutionService: ScreenResolutionService,
    private _formBuilder: NonNullableFormBuilder,
    private _userService: UserService,
    private _associationService: AssociationService,
    private _router: Router
  ) {
    this.isMobile$ = this._screeResolutionService.isMobile();
  }

  ngOnInit(): void {
    this.associations$ = this._associationService.get();
  }

  onSubmit(e: MouseEvent): void {
    e.preventDefault();
    this.submittedSecond = true;
    if (this.formFirst.invalid && this.formSecond.invalid) {
      return;
    }
    const { controls: controlsFirst } = this.formFirst
    const { controls: controlsSecond } = this.formSecond

    const subscription = this._userService.registerTouristGuide({
      email: controlsFirst.email.value,
      name: controlsFirst.name.value,
      phone: controlsFirst.phone.value,
      documents: [
        { type: DocumentTypeEnum.CPF, value: controlsFirst.document.value},
        { type: DocumentTypeEnum.AssociationCard, value: controlsSecond.associationCard.value}
      ],
      password: controlsSecond.password.value,
      associations: [controlsSecond.association.value],
    }).subscribe(() => {
      this._router.navigate(['/tourist-guide/trekkings']);
      subscription.unsubscribe();
    });
  }

  nextStep(): void {
    if (this.formFirst.valid) {
      this.step = RegisterSteps.Second;
    }
    this.submittedFirst = true;
  }

  get firstControls() {
    return this.formFirst.controls;
  }

  get secondControls() {
    return this.formSecond.controls;
  }

}
