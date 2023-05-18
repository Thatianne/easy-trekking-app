import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Trekking } from '@models/trekking';
import { ScreenResolutionService } from '@services/screen-resolution/screen-resolution.service';
import { TrekkingService } from '@services/trekking/trekking.service';
import { UserService } from '@services/user/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-trekkings',
  templateUrl: './trekkings.component.html',
  styleUrls: ['./trekkings.component.scss']
})
export class TrekkingsComponent implements OnInit {
  isMobile$: Observable<boolean>;
  trekkings$: Observable<Trekking[]>;

  search: string = '';
  filtersIsOpen = false;
  formModal: any;

  @ViewChild('filtersModal', { static: true }) filtersModal!: ElementRef;

  constructor(
    private _screeResolutionService: ScreenResolutionService,
    private _trekkingService: TrekkingService,
    private _userService: UserService
  ) {
    this.isMobile$ = this._screeResolutionService.isMobile();
    this.trekkings$ = this._trekkingService.get();
  }

  ngOnInit(): void {
    // @ts-ignore
    this.formModal = new window.bootstrap.Modal(
      this.filtersModal.nativeElement
    )
  }

  onSearch(e: MouseEvent): void {
    // e.preventDefault();
  }

  onOpenFilters(): void {
    // this.filtersIsOpen = true;
    this.formModal.show();
  }

  onCloseFilters(): void {
    // this.filtersIsOpen = false;
  }
}
