import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Trekking } from '@models/trekking';
import { ScreenResolutionService } from '@services/screen-resolution/screen-resolution.service';
import { TrekkingService } from '@services/trekking/trekking.service';
import {
  BehaviorSubject,
  Observable,
  Subject,
  combineLatest,
  startWith,
  tap,
} from 'rxjs';
import { FilterParams } from '../../components/trekking-filters/models/filter-params';
import { Router } from '@angular/router';
import { UserService } from '@services/user/user.service';
import { RoleEnum } from 'src/app/enums/role.enum';

@Component({
  selector: 'app-trekkings',
  templateUrl: './trekkings.component.html',
  styleUrls: ['./trekkings.component.scss'],
})
export class TrekkingsComponent implements OnInit {
  isMobile$: Observable<boolean>;
  trekkings$!: Observable<Trekking[]>;
  filters$ = new BehaviorSubject<FilterParams>({});
  searchText$ = new BehaviorSubject<string>('');

  search: string = '';
  formModal: any;

  @ViewChild('filtersModal', { static: true }) filtersModal!: ElementRef;

  constructor(
    private _screeResolutionService: ScreenResolutionService,
    private _trekkingService: TrekkingService,
    private _userService: UserService,
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
}
