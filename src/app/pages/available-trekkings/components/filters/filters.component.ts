import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { City } from '@models/city';
import { State } from '@models/state';
import { CityService } from '@services/city/city.service';
import { ScreenResolutionService } from '@services/screen-resolution/screen-resolution.service';
import { StateService } from '@services/state/state.service';
import { Observable } from 'rxjs';
import { DifficultLevelEnum } from 'src/app/enums/difficult-level.enum';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  isMobile$: Observable<boolean>;
  states$: Observable<State[]> = new Observable();
  cities$: Observable<City[]> = new Observable();

  formFilter = this._formBuilder.group({
    state: ['', []],
    city: ['', []],
    durationMin: ['', []],
    durationMax: ['', []],
    difficultLevel: [DifficultLevelEnum.Easy, []]
  });

  difficultLevelEnum = DifficultLevelEnum;

  constructor(
    private _screeResolutionService: ScreenResolutionService,
    private _formBuilder: NonNullableFormBuilder,
    private _stateService: StateService,
    private _cityService: CityService,
  ) {
    this.isMobile$ = this._screeResolutionService.isMobile();
  }

  ngOnInit(): void {
    this.states$ = this._stateService.get();
    this.cities$ = this._cityService.get();

  }

  onSelectLevel(value: DifficultLevelEnum): void {
    const { controls } = this.formFilter
    this.formFilter.setValue({
      state: controls.state.value,
      city: controls.city.value,
      durationMin: controls.durationMin.value,
      durationMax: controls.durationMax.value,
      difficultLevel: value
    })
  }

  get formControls() {
    return this.formFilter.controls;
  }

}
