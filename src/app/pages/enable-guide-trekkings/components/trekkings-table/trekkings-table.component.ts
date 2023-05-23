import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Trekking } from '@models/trekking';
import { BehaviorSubject, debounceTime, filter } from 'rxjs';

@Component({
  selector: 'app-trekkings-table',
  templateUrl: './trekkings-table.component.html',
  styleUrls: ['./trekkings-table.component.scss']
})
export class TrekkingsTableComponent implements OnInit {
  @Input()
  set trekkings(trekkings: Trekking[]) {
    this._trekkings = trekkings;

    if (this._trekkings.length > 0) {
      this._setForm$.next(true);
    }
  }
  get trekkings(): Trekking[] {
    return this._trekkings;
  }

  @Input()
  set trekkingsIdEnabled(trekkingIds: number[]){
    this._trekkingsIdEnabled = trekkingIds;
    this._setForm$.next(true);
  }
  get trekkingsIdEnabled(): number[] {
    return this._trekkingsIdEnabled;
  }

  private _trekkings: Trekking[] = [];
  private _trekkingsIdEnabled: number[] = [];
  private _setForm$ = new BehaviorSubject(false);

  form = this._formBuilder.group({
    trekkings: this._formBuilder.array([this._formBuilder.group({
      value: false,
      trekkingId: 0
    })])
  });

  constructor(private _router: Router, private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this._setForm();
  }

  getCheckedTrekkingIds(): number[] {
    const checkedItems = this.formTrekkings.controls.filter(item => item.value.value);
    return checkedItems.map(item => item.value.trekkingId)
  }

  get formTrekkings() {
    return this.form.controls["trekkings"] as FormArray;
  }

  private _setForm(): void {
    this._setForm$.pipe(debounceTime(200), filter(Boolean))
      .subscribe(value => {
        this.formTrekkings.clear();

        this._trekkings.forEach(trekking => {
          this.formTrekkings.push(this._formBuilder.group({
            value: this._trekkingsIdEnabled.includes(trekking.id),
            trekkingId: trekking.id
          }))
        });
      })
  }
}
