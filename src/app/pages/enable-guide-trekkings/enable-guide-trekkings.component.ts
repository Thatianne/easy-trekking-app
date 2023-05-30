import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Trekking } from '@models/trekking';
import { ScreenResolutionService } from '@services/screen-resolution/screen-resolution.service';
import { TrekkingService } from '@services/trekking/trekking.service';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  map,
} from 'rxjs';
import { FilterParams } from '../../components/trekking-filters/models/filter-params';
import { Router } from '@angular/router';
import { UserService } from '@services/user/user.service';
import { RoleEnum } from 'src/app/enums/role.enum';
import { GuideTrekkingsService } from '@services/guide-trekkings/guide-trekkings.service';
import { TrekkingsTableComponent } from './components/trekkings-table/trekkings-table.component';

@Component({
  selector: 'app-trekkings',
  templateUrl: './enable-guide-trekkings.component.html',
  styleUrls: ['./enable-guide-trekkings.component.scss'],
})
export class EnableGuideTrekkingsComponent implements OnInit {
  isMobile$: Observable<boolean>;
  trekkings$!: Observable<Trekking[]>;
  trekkingsEnabled$!: Observable<number[]>;
  filters$ = new BehaviorSubject<FilterParams>({});
  searchText$ = new BehaviorSubject<string>('');
  search: string = '';
  userId: number = 0
  formModal: any;

  @ViewChild('filtersModal', { static: true }) filtersModal!: ElementRef;
  @ViewChild('table', { static: true }) table!: TrekkingsTableComponent;

  constructor(
    private _screeResolutionService: ScreenResolutionService,
    private _trekkingService: TrekkingService,
    private _userService: UserService,
    private _guideTrekkingsService: GuideTrekkingsService,
    private _router: Router
  ) {
    this.isMobile$ = this._screeResolutionService.isMobile();
    combineLatest([this.filters$, this.searchText$]).subscribe(
      ([filters, searchText]) => {
        this.trekkings$ = this._trekkingService.get({
          ...filters,
          name: searchText,
        });
      }
    );

    this._userService.getUser().subscribe((user) => {
      if (user?.role.id === RoleEnum.Tourist) {
        this._router.navigate(['/trekkings']);
      }
      if (user) {
        this.userId = user.id
        this.trekkingsEnabled$ = this._guideTrekkingsService.getAbleToGuide(user.id).pipe(
          map(trekkings => trekkings.map(t => t.id))
        );
      }
    });
  }

  ngOnInit(): void {
    // @ts-ignore
    this.formModal = new window.bootstrap.Modal(
      this.filtersModal.nativeElement
    );
  }

  onSearch(): void {
    this.searchText$.next(this.search);
  }

  onOpenFilters(): void {
    this.formModal.show();
  }

  filterTrekkings(filters: FilterParams): void {
    this.filters$.next(filters);
    this.formModal.hide();
  }

  enableGuideTrekkings(): void {
    const trekkingIds = this.table.getCheckedTrekkingIds();

    this._guideTrekkingsService.defineAbleToGuide(this.userId, trekkingIds).subscribe();
  }
}
