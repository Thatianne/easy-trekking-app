import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Trekking, TrekkingPrice } from '@models/trekking';
import { TrekkingService } from '@services/trekking/trekking.service';
import { Observable, Subject, map, take, tap } from 'rxjs';
import { difficultLevelClass } from './constants/difficult-level-class';
import { DifficultLevelEnum } from 'src/app/enums/difficult-level.enum';
import { difficultLevelLabel } from './constants/difficult-level-label';
import { TrekkingImage } from '@models/trekking-image';

@Component({
  selector: 'app-trekking-details',
  templateUrl: './trekking-details.component.html',
  styleUrls: ['./trekking-details.component.scss']
})
export class TrekkingDetailsComponent implements OnInit {
  trekkingDate: string = '';

  trekking$: Observable<Trekking> = new Subject();
  price$!: Observable<string>;

  difficultLevelBadgdeClass = difficultLevelClass;
  difficultLevelBadgdeLabel = difficultLevelLabel;
  difficultLeveEnums = DifficultLevelEnum;

  constructor(private _route: ActivatedRoute, private _trekkingService: TrekkingService) {}

  ngOnInit(): void {
    this._route.paramMap.pipe(
      take(1),
      tap(params => {
        const id = Number(params.get('id'))
        this.trekking$ = this._trekkingService.getById(id);
      })
    ).subscribe();
  }

  changedDate(event: Event): void {
    event.preventDefault()

    this.price$ = this._searchPrices()
      .pipe(
        map(prices => prices.length > 0 ? `R$${prices[0].price}` : '')
      )
  }

  onSubscribe(event: MouseEvent, id: number): void {
    event.preventDefault()
    this.price$.pipe(take(1))
      .subscribe((price) => {
        if (price ) {
          this._trekkingService.subscribe(id).subscribe(() => {console.log('inscrito')});
        }
      })
  }

  getSrcImages(images: TrekkingImage[]): string[] {
    return images.map(image => image.image) || []
  }

  private _searchPrices(): Observable<TrekkingPrice[]> {
    return this.trekking$.pipe(
      take(1),
      map(trekking => trekking.prices
        .filter(price => this._isBetweenDate(
          new Date(this.trekkingDate),
          {
            start: new Date(price.startDate),
            end: new Date(price.endDate)
          })
        )
      )
    )
  }

  private _isBetweenDate(checkDate: Date, { start, end }: { start: Date, end: Date}): boolean {
    return checkDate > start && checkDate < end
  }
}
