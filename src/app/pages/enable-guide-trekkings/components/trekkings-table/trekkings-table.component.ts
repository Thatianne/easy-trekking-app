import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Trekking } from '@models/trekking';

@Component({
  selector: 'app-trekkings-table',
  templateUrl: './trekkings-table.component.html',
  styleUrls: ['./trekkings-table.component.scss']
})
export class TrekkingsTableComponent implements OnInit {
  @Input()
  set trekkings(trekkings: Trekking[]) {
    this._trekkings = trekkings;
    this._setForm();
  }
  get trekkings(): Trekking[] {
    return this._trekkings;
  }

  @Input()
  set trekkingsIdEnabled(trekkingIds: number[]){
    this._trekkingsIdEnabled = trekkingIds;
    this._setForm()
  }
  get trekkingsIdEnabled(): number[] {
    return this._trekkingsIdEnabled;
  }

  private _trekkings: Trekking[] = [];
  private _trekkingsIdEnabled: number[] = [];

  form = this._formBuilder.group({
    trekkings: this._formBuilder.array([this._formBuilder.group({
      value: false,
      trekkingId: 0
    })])
  }) ;

  constructor(private _router: Router, private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formTrekkings.clear();
  }

  getCheckedTrekkingIds(): number[] {
    const checkedItems = this.formTrekkings.controls.filter(item => item.value.value);
    return checkedItems.map(item => item.value.trekkingId)
  }

  get formTrekkings() {
    return this.form.controls["trekkings"] as FormArray;
  }

  private _setForm(): void {
    this.formTrekkings.clear();

    this._trekkings.forEach(trekking => {
      this.formTrekkings.push(this._formBuilder.group({
        value: this.trekkingsIdEnabled.includes(trekking.id),
        trekkingId: trekking.id
      }))
    });
  }
}
