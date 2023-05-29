import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Trekking, TrekkingPrice } from '@models/trekking';
import { TrekkingService } from '@services/trekking/trekking.service';
import { BehaviorSubject, Observable, Subject, map, take, tap } from 'rxjs';
import { difficultLevelClass } from './constants/difficult-level-class';
import { DifficultLevelEnum } from 'src/app/enums/difficult-level.enum';
import { difficultLevelLabel } from './constants/difficult-level-label';
import { TrekkingImage } from '@models/trekking-image';
import { UserService } from '@services/user/user.service';
import { User } from '@models/user';
import { RoleEnum } from 'src/app/enums/role.enum';
import { HttpStatusCode } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-trekking-details',
  templateUrl: './trekking-details.component.html',
  styleUrls: ['./trekking-details.component.scss'],
})
export class TrekkingDetailsComponent implements OnInit {
  trekkingDate: string = '';

  trekking$ = new BehaviorSubject<Trekking | null>(null);
  price$!: Observable<string>;
  user$!: Observable<User | null>;
  badRequestMessage$ = new BehaviorSubject('');
  successMessage$ = new BehaviorSubject('');
  userId: number = 0;

  difficultLevelBadgdeClass = difficultLevelClass;
  difficultLevelBadgdeLabel = difficultLevelLabel;
  difficultLeveEnums = DifficultLevelEnum;
  roleEnum = RoleEnum;

  constructor(
    private _route: ActivatedRoute,
    private _trekkingService: TrekkingService,
    private _userService: UserService,
    private _datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this._route.paramMap
      .pipe(
        take(1),
        tap((params) => {
          const id = Number(params.get('id'));
          this._trekkingService.getById(id).subscribe((trekking) => {
            this.trekking$.next(trekking);
          });
        })
      )
      .subscribe();

    this.user$ = this._userService.getUser();
    this.user$.subscribe((user) => {
      this.userId = user?.id || 0;
    });
  }

  changedDate(event: Event): void {
    event.preventDefault();

    this.badRequestMessage$.next('');
    this.successMessage$.next('');
    this.price$ = this._searchPrices().pipe(
      map((prices) => (prices.length > 0 ? `R$${prices[0].price}` : ''))
    );
  }

  onSubscribe(event: MouseEvent, id: number): void {
    event.preventDefault();
    this.price$.pipe(take(1)).subscribe((price) => {
      if (price) {
        this.badRequestMessage$.next('');
        this.successMessage$.next('');

        this._trekkingService
          .subscribe(id, this.userId, this._toDate(this.trekkingDate))
          .subscribe({
            next: (group) => {
              this.successMessage$.next(
                `Você está inscrito no trekking ${
                  group.trekking.name
                } para o dia ${this._datePipe.transform(
                  group.date,
                  'dd/MM/YY'
                )}`
              );
            },
            error: (err) => {
              if (err.status === HttpStatusCode.BadRequest) {
                this.badRequestMessage$.next(err.error.message);
              }
            },
          });
      }
    });
  }

  getSrcImages(images: TrekkingImage[]): string[] {
    return images.map((image) => image.image) || [];
  }

  private _searchPrices(): Observable<TrekkingPrice[]> {
    return this.trekking$.pipe(
      take(1),
      map((trekking) =>
        trekking
          ? trekking.prices.filter((price) =>
              this._isBetweenDate(this._toDate(this.trekkingDate), {
                start: new Date(price.startDate),
                end: new Date(price.endDate),
              })
            )
          : []
      )
    );
  }

  private _isBetweenDate(
    checkDate: Date,
    { start, end }: { start: Date; end: Date }
  ): boolean {
    return checkDate >= start && checkDate <= end;
  }

  private _toDate(date: string): Date {
    const splitedDate = date.split('-');
    return new Date(+splitedDate[0], +splitedDate[1] - 1, +splitedDate[2]);
  }
}
