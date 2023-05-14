import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ScreenResolutionService } from '@services/screen-resolution/screen-resolution.service';
import { UserService } from '@services/user/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-available-trekkings',
  templateUrl: './available-trekkings.component.html',
  styleUrls: ['./available-trekkings.component.scss']
})
export class AvailableTrekkingsComponent implements OnInit {
  isMobile$: Observable<boolean>;
  search: string = '';
  filtersIsOpen = false;
  formModal: any;

  @ViewChild('filtersModal', { static: true }) filtersModal!: ElementRef;

  constructor(
    private _screeResolutionService: ScreenResolutionService,
    private _userService: UserService
  ) {
    this.isMobile$ = this._screeResolutionService.isMobile();
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
