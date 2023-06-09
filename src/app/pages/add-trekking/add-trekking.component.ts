import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { City } from '@models/city';
import { State } from '@models/state';
import { CityService } from '@services/city/city.service';
import { ScreenResolutionService } from '@services/screen-resolution/screen-resolution.service';
import { StateService } from '@services/state/state.service';
import { TrekkingService } from '@services/trekking/trekking.service';
import { UserService } from '@services/user/user.service';
import { BehaviorSubject, Observable, filter, take, tap } from 'rxjs';
import { DifficultLevelEnum } from 'src/app/enums/difficult-level.enum';
import { RoleEnum } from 'src/app/enums/role.enum';
import {
  AddTrekkingPriceRequest,
  AddTrekkingRequest,
  AddTrekkingDescriptionRequest,
  AddTrekkingImageRequest,
  Trekking,
} from '@models/trekking';
import { UploadFileService } from '@services/upload-file/upload-file.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-trekking',
  templateUrl: './add-trekking.component.html',
  styleUrls: ['./add-trekking.component.scss'],
})
export class AddTrekkingComponent implements OnInit {
  isMobile$: Observable<boolean>;
  states$: Observable<State[]> = new Observable();
  cities$: Observable<City[]> = new Observable();
  isSalving$ = new BehaviorSubject(false);
  trekking$!: Observable<Trekking>;
  trekkingId: number = 0;
  @ViewChild('inpuFile') inpuFile!: ElementRef;
  images$ = new BehaviorSubject<AddTrekkingImageRequest[]>([]);
  imagesLoading$ = new BehaviorSubject(false);

  difficultLevelEnum = DifficultLevelEnum;
  isEdit$ = new BehaviorSubject(false);
  submitted = false;
  form = this._formBuilder.group({
    name: ['', [Validators.required]],
    description: [''],
    start: ['', [Validators.required]],
    end: ['', [Validators.required]],
    state: [0, [Validators.required]],
    city: [0, [Validators.required]],
    distanceInMeters: ['', [Validators.required]],
    durationInHours: ['', [Validators.required]],
    difficultLevel: [DifficultLevelEnum.Easy, [Validators.required]],
    descriptions: this._formBuilder.array([
      this._formBuilder.group({
        value: ['', [Validators.required]],
        id: [0]
      }),
    ]),
    prices: this._formBuilder.array([
      this._formBuilder.group({
        startDate: '',
        endDate: '',
        price: 0,
        id: 0
      }),
    ]),
    minPeople: [5, [Validators.required]],
    maxPeople: [15, [Validators.required]],
    daysFormGroup: [10, [Validators.required]],
    daysCompletePayment: [15, [Validators.required]],
  });

  constructor(
    private _screeResolutionService: ScreenResolutionService,
    private _formBuilder: FormBuilder,
    private _trekkingService: TrekkingService,
    private _stateService: StateService,
    private _cityService: CityService,
    private _userService: UserService,
    private _uploadFileService: UploadFileService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _datePipe: DatePipe
  ) {
    this.isMobile$ = this._screeResolutionService.isMobile();

    this.states$ = this._stateService.get();
    this.cities$ = this._cityService.get();

    this._userService.getUser().subscribe((user) => {
      if (user?.role.id !== RoleEnum.Administrator) {
        this._router.navigate(['/admin/trekkings']);
      }
    });
  }

  ngOnInit(): void {
    this.descriptions.clear();

    this._route.paramMap
      .pipe(
        take(1),
        tap((params) => {
          const id = Number(params.get('id'));
          if (id) {
            this.trekkingId = id;
            this.trekking$ = this._trekkingService.getById(id);
            this.trekking$.subscribe((trekking) => {
              this._setEditTrekking(trekking);
            });
            this.isEdit$.next(true);
          }
        })
      )
      .subscribe();
  }

  get controls() {
    return this.form.controls;
  }

  get descriptions() {
    return this.form.controls['descriptions'] as FormArray;
  }

  get prices() {
    return this.form.controls['prices'] as FormArray;
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    const { controls } = this.form;

    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    this.isSalving$.next(true);
    this.imagesLoading$
      .pipe(
        filter((imagesLoading) => !imagesLoading),
        take(1)
      )
      .subscribe(() => {
        const trekking: AddTrekkingRequest = {
          name: controls.name.value || '',
          description: controls.description.value || '',
          start: controls.start.value || '',
          end: controls.end.value || '',
          state: controls.state.value || 0,
          city: controls.city.value || 0,
          distanceInMeters: +(controls.distanceInMeters.value || 0),
          durationInHours: +(controls.durationInHours.value || 0),
          difficultLevel: controls.difficultLevel.value || DifficultLevelEnum.Easy,
          images: this.images$.value,
          descriptions:
            controls.descriptions.value?.map((description) => {
              const trekkingDescription: AddTrekkingDescriptionRequest = {
              description: description.value || ''
            }

            if (description.id) {
              trekkingDescription.id = description.id;
            }

            return trekkingDescription;
          }) || [],
          prices:
            controls.prices.value?.map((price) => {
              const startDate = price.startDate
                ? new Date(price.startDate)
                : new Date();
              startDate.setHours(0, 0, 0, 0);
              const endDate = price.endDate ? new Date(price.endDate) : new Date();
              endDate.setHours(0, 0, 0, 0);
              const priceRequest = <AddTrekkingPriceRequest>{
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                price: price.price,
              };

              if (price.id) {
                priceRequest.id = price.id;
              }
              return priceRequest;
            }) || [],
          minPeople: controls.minPeople.value || 0,
          maxPeople: controls.maxPeople.value || 0,
          daysFormGroup: controls.daysFormGroup.value || 0,
          daysCompletePayment: controls.daysCompletePayment.value || 0,
        };

        if (this.isEdit$.value) {
          const subscription = this._trekkingService
            .edit(this.trekkingId, trekking)
            .subscribe(() => {
              this.isSalving$.next(false);
              this._router.navigate(['/admin/trekkings']);

              subscription.unsubscribe();
            });
        } else {
          const subscription = this._trekkingService.add(trekking).subscribe(() => {
            this.isSalving$.next(false);
            this._router.navigate(['/admin/trekkings']);

            subscription.unsubscribe();
          });
        }
      });
  }

  addDescription(event: Event): void {
    event.preventDefault();
    this.descriptions.push(
      this._formBuilder.group({
        value: ['', [Validators.required]],
      })
    );
  }

  deleteDescription(event: Event): void {
    event?.preventDefault();

    this.descriptions.removeAt(this.descriptions.controls.length - 1);
  }

  addPrice(event: Event): void {
    event.preventDefault();
    this.prices.push(
      this._formBuilder.group({
        startDate: new Date(),
        endDate: null,
        price: null
      })
    );
  }

  deletePrice(event: Event): void {
    event?.preventDefault();

    this.prices.removeAt(this.prices.controls.length - 1);
  }

  onSelectLevel(value: DifficultLevelEnum, event: Event): void {
    event.preventDefault();

    this.form.patchValue({
      difficultLevel: value,
    });
  }

  async uploadImages(event: Event): Promise<void> {
    if (event.target) {
      this.imagesLoading$.next(true);
      // @ts-ignore
      const files = event.target.files;
      const subscription = this._uploadFileService
        .upload(files)
        .subscribe((filesUrl) => {
          this.images$.next(this.images$.value.concat(filesUrl.map(url => ({
            image: url
          }))));
          this.imagesLoading$.next(false);
          // @ts-ignore
          // event.target.files = null;
          // @ts-ignore
          event.target.value == null;
          subscription.unsubscribe();
        });
    }
  }

  private _setEditTrekking(trekking: Trekking): void {
    this.descriptions.clear();
    this.prices.clear();
    trekking.descriptions.forEach((description) => {
      this.descriptions.push(
        this._formBuilder.group({
          value: [description.description, [Validators.required]],
          id: description.id
        })
      );
    });

    trekking.prices.forEach((price) => {
      this.prices.push(
        this._formBuilder.group({
          startDate: this._datePipe.transform(price.startDate, 'YYYY-LL-dd'),
          endDate: this._datePipe.transform(price.endDate, 'YYYY-LL-dd'),
          price: price.price,
          id: price.id
        })
      );
    });

    this.form.patchValue({
      name: trekking.name,
      description: trekking.description,
      start: trekking.start,
      end: trekking.end,
      state: trekking.state.id,
      city: trekking.city.id,
      distanceInMeters: `${trekking.distanceInMeters}`,
      durationInHours: `${trekking.durationInHours}`,
      difficultLevel: trekking.difficultLevel.id,
      minPeople: trekking.minPeople,
      maxPeople: trekking.maxPeople,
      daysFormGroup: trekking.daysFormGroup,
      daysCompletePayment: trekking.daysCompletePayment,
    });

    this.images$.next(trekking.images);
  }

  onRemove(deleteImage: AddTrekkingImageRequest): void {
    const filteredImages = this.images$.value.filter(image => image.image !== deleteImage.image);
    this.images$.next(filteredImages);
  }
}
