import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Trekking } from '@models/trekking';
import { TrekkingService } from '@services/trekking/trekking.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-trekkings-table',
  templateUrl: './trekkings-table.component.html',
  styleUrls: ['./trekkings-table.component.scss']
})
export class TrekkingsTableComponent implements OnInit {
  trekkings$!: Observable<Trekking[]>;

  constructor(private _trekkingService: TrekkingService, private _router: Router) {}

  ngOnInit(): void {
    this.trekkings$ = this._trekkingService.get();
  }

  onTrekkingSelect(trekking: Trekking): void {
    this._router.navigate(['/trekkings', { id: trekking.id }]);
  }
}
