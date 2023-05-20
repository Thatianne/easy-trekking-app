import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FilterParams } from '@components/trekking-filters/models/filter-params';
import { Trekking } from '@models/trekking';
import { ScreenResolutionService } from '@services/screen-resolution/screen-resolution.service';
import { TrekkingService } from '@services/trekking/trekking.service';
import { UserService } from '@services/user/user.service';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { RoleEnum } from 'src/app/enums/role.enum';

@Component({
  selector: 'app-available-trekkings',
  templateUrl: './available-trekkings.component.html',
  styleUrls: ['./available-trekkings.component.scss'],
})
export class AvailableTrekkingsComponent implements OnInit {
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
          isAvailable: true,
        });
      }
    );

    this._userService.getUser().subscribe((user) => {
      if (user?.role.id === RoleEnum.TouristGuide) {
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

  gotToTrekking(trekking: Trekking): void {
    this._router.navigate([`/trekkings/${trekking.id}`]);
  }
}
