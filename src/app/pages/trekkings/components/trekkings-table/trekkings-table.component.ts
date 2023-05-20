import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Trekking } from '@models/trekking';

@Component({
  selector: 'app-trekkings-table',
  templateUrl: './trekkings-table.component.html',
  styleUrls: ['./trekkings-table.component.scss']
})
export class TrekkingsTableComponent {
  @Input() trekkings!: Trekking[] | null;

  constructor(private _router: Router) {}

  onTrekkingSelect(trekking: Trekking): void {
    this._router.navigate([`/trekkings/${trekking.id}`]);
  }
}
