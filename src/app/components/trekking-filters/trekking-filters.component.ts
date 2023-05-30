import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { City } from '@models/city';
import { State } from '@models/state';
import { FilterParams } from './models/filter-params';
import { CityService } from '@services/city/city.service';
import { ScreenResolutionService } from '@services/screen-resolution/screen-resolution.service';
import { StateService } from '@services/state/state.service';
import { Observable } from 'rxjs';
import { DifficultLevelEnum } from 'src/app/enums/difficult-level.enum';

@Component({
  selector: 'app-trekking-filters',
  templateUrl: './trekking-filters.component.html',
  styleUrls: ['./trekking-filters.component.scss']
})
export class TrekkingFiltersComponent implements OnInit {
  isMobile$: Observable<boolean>;
  states$: Observable<State[]> = new Observable();
  cities$: Observable<City[]> = new Observable();

  formFilter = this._formBuilder.group({
    state: [null, []],
    city: [null, []],
    durationMin: [null, []],
    durationMax: [null, []],
    difficultLevel: [DifficultLevelEnum.Easy, []]
  });

  difficultLevelEnum = DifficultLevelEnum;

  @Output() filter = new EventEmitter<FilterParams>();

  constructor(
    private _screeResolutionService: ScreenResolutionService,
    private _formBuilder: FormBuilder,
    private _stateService: StateService,
    private _cityService: CityService,
  ) {
    this.isMobile$ = this._screeResolutionService.isMobile();
  }

  ngOnInit(): void {
    this.states$ = this._stateService.get();
    this.cities$ = this._cityService.get();
  }

  onSelectLevel(value: DifficultLevelEnum | null): void {
    this.formFilter.patchValue({
      difficultLevel: value
    })
  }

  get formControls() {
    return this.formFilter.controls;
  }

  onFilter(): void {
    this.filter.emit({
      state: this.formControls.state.value,
      city: this.formControls.city.value,
      durationMin: this.formControls.durationMin.value,
      durationMax: this.formControls.durationMax.value,
      difficultLevel: this.formControls.difficultLevel.value
    })
  }

  clearFilters(): void {
    this.formFilter.setValue({
      state: null,
      city: null,
      durationMin: null,
      durationMax: null,
      difficultLevel: null
    })
  }

}
