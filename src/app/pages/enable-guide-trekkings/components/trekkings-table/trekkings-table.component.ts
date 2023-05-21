import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Trekking } from '@models/trekking';

@Component({
  selector: 'app-trekkings-table',
  templateUrl: './trekkings-table.component.html',
  styleUrls: ['./trekkings-table.component.scss']
})
export class TrekkingsTableComponent implements OnInit {
  @Input() trekkings!: Trekking[] | null;
  set(trekkings: Trekking[]): void {
    this._trekkings = trekkings;
  }

  get(): Trekking[] {
    return this._trekkings;
  }

  private _trekkings: Trekking[] = [];

  form = this._formBuilder.array([this._formBuilder.group({
    value: false
  })]);

  constructor(private _router: Router, private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form.clear();
  }

  onTrekkingSelect(trekking: Trekking): void {
    // this._router.navigate([`/tourist-guide/trekkings/edit/${trekking.id}`]);
  }
}
