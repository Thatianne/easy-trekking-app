import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { City } from '@models/city';
import { State } from '@models/state';
import { CityService } from '@services/city/city.service';
import { ScreenResolutionService } from '@services/screen-resolution/screen-resolution.service';
import { StateService } from '@services/state/state.service';
import { TrekkingService } from '@services/trekking/trekking.service';
import { UserService } from '@services/user/user.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { DifficultLevelEnum } from 'src/app/enums/difficult-level.enum';
import { RoleEnum } from 'src/app/enums/role.enum';
import { AddTrekkingPriceRequest } from '@models/trekking'
import { UploadFileService } from '@services/upload-file/upload-file.service';

@Component({
  selector: 'app-add-trekking',
  templateUrl: './add-trekking.component.html',
  styleUrls: ['./add-trekking.component.scss']
})
export class AddTrekkingComponent {
  isMobile$: Observable<boolean>;
  images: string[] = [];
  states$: Observable<State[]> = new Observable();
  cities$: Observable<City[]> = new Observable();
  isSalving$ = new BehaviorSubject(false);
  @ViewChild('inpuFile') inpuFile!: ElementRef;

  difficultLevelEnum = DifficultLevelEnum;

  submitted = false;
  form = this._formBuilder.group(
    {
      name: ['', [Validators.required]],
      start: ['', [Validators.required]],
      end: ['', [Validators.required]],
      state: [null, [Validators.required]],
      city: [null, [Validators.required]],
      distanceInMeters: [null, [Validators.required]],
      durationInHours: [null, [Validators.required]],
      difficultLevel: [DifficultLevelEnum.Easy, [Validators.required]],
      descriptions: this._formBuilder.array([this._formBuilder.group({
        value: ['', [Validators.required]]
      })]),
      prices: this._formBuilder.array([this._formBuilder.group({
        startDate: '',
        endDate: '',
        price: 0
      })]),
      minPeople: [5, [Validators.required]],
      maxPeople: [15, [Validators.required]],
      daysFormGroup: [10, [Validators.required]],
      daysCompletePayment: [15, [Validators.required]],
    }
  );

  constructor(
    private _screeResolutionService: ScreenResolutionService,
    private _formBuilder: NonNullableFormBuilder,
    private _trekkingService: TrekkingService,
    private _stateService: StateService,
    private _cityService: CityService,
    private _userService: UserService,
    private _uploadFileService: UploadFileService,
    private _router: Router
  ) {
    this.isMobile$ = this._screeResolutionService.isMobile();

    this.states$ = this._stateService.get();
    this.cities$ = this._cityService.get();

    this._userService.getUser().subscribe((user) => {
      if (user?.role.id !== RoleEnum.Administrator) {
        this._router.navigate(['/']);
      }
    });
  }

  get controls() {
    return this.form.controls;
  }

  get descriptions() {
    return this.form.controls["descriptions"] as FormArray;
  }

  get prices() {
    return this.form.controls["prices"] as FormArray;
  }

  onSubmit(event: Event): void {
    event.preventDefault()
    const { controls } = this.form;

    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    this.isSalving$.next(true)
    // @ts-ignore
    const files = this.inpuFile.nativeElement.files;
    const fileSubscription = this._uploadFileService.upload(files)
      .subscribe(filesUrl => {
        this.images = filesUrl;
        fileSubscription.unsubscribe();

        const subscription = this._trekkingService.add({
          name: controls.name.value,
          start: controls.start.value,
          end: controls.end.value,
          state: controls.state.value || 0,
          city: controls.city.value || 0,
          distanceInMeters: controls.distanceInMeters.value || 0,
          durationInHours: controls.durationInHours.value || 0,
          difficultLevel: controls.difficultLevel.value,
          images: this.images,
          descriptions: controls.descriptions.value?.map(description => description.value || '') || [],
          prices: controls.prices.value?.map(price => (
            <AddTrekkingPriceRequest>{
              startDate: price.startDate,
              endDate: price.endDate,
              price: price.price,
            })) || [],
          minPeople: controls.minPeople.value,
          maxPeople: controls.maxPeople.value,
          daysFormGroup: controls.daysFormGroup.value,
          daysCompletePayment: controls.daysCompletePayment.value
        }).subscribe(() => {
          this.isSalving$.next(false);
          this._router.navigate(['/trekkings']);

          subscription.unsubscribe();
        })
      })
  }

  addDescription(event: Event): void {
    event.preventDefault();
    this.descriptions.push(this._formBuilder.group({
      value: ['', [Validators.required]]
    }));
  }

  deleteDescription(event: Event): void {
    event?.preventDefault();

    this.descriptions.removeAt(this.descriptions.controls.length - 1)
  }

  addPrice(event: Event): void {
    event.preventDefault();
    this.prices.push(this._formBuilder.group({
      startDate: null,
      endDate: null,
      price: null
    }));
  }

  deletePrice(event: Event): void {
    event?.preventDefault();

    this.prices.removeAt(this.prices.controls.length - 1)
  }

  onSelectLevel(value: DifficultLevelEnum, event: Event): void {
    event.preventDefault();

    this.form.patchValue({
      difficultLevel: value
    })
  }

  async uploadImages(event: Event): Promise<void> {
    if (event.target) {
      // @ts-ignore
      const files = event.target.files;
      const subscription = this._uploadFileService.upload(files)
        .subscribe(filesUrl => {
          this.images = filesUrl;
          subscription.unsubscribe();
        })
    }
  }
}
