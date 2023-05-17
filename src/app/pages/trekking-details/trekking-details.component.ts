import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Trekking } from '@models/trekking';
import { TrekkingService } from '@services/trekking/trekking.service';
import { Observable, switchMap } from 'rxjs';
import { difficultLevelClass } from './constants/difficult-level-class';
import { DifficultLevelEnum } from 'src/app/enums/difficult-level.enum';
import { difficultLevelLabel } from './constants/difficult-level-label';

@Component({
  selector: 'app-trekking-details',
  templateUrl: './trekking-details.component.html',
  styleUrls: ['./trekking-details.component.scss']
})
export class TrekkingDetailsComponent implements OnInit {
  trekking$!: Observable<Trekking>;
  difficultLevelBadgdeClass = difficultLevelClass;
  difficultLevelBadgdeLabel = difficultLevelLabel;
  difficultLeveEnums = DifficultLevelEnum;

  constructor(private _route: ActivatedRoute, private _trekkingService: TrekkingService) {}

  ngOnInit(): void {
    this.trekking$ = this._route.paramMap.pipe(
      switchMap(params => {
        return this._trekkingService.getById(Number(params.get('id')))
      })
    );

    this.trekking$.subscribe(console.log)
  }
}
