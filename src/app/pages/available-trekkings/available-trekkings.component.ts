import { Component } from '@angular/core';
import { ScreenResolutionService } from '@services/screen-resolution/screen-resolution.service';
import { UserService } from '@services/user/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-available-trekkings',
  templateUrl: './available-trekkings.component.html',
  styleUrls: ['./available-trekkings.component.scss']
})
export class AvailableTrekkingsComponent {
  isMobile$: Observable<boolean>;

  search: string = '';

  constructor(
    private _screeResolutionService: ScreenResolutionService,
    private _userService: UserService
  ) {
    this.isMobile$ = this._screeResolutionService.isMobile();
  }

  onSearch(e: MouseEvent): void {
    // e.preventDefault();
  }

  onOpenFilters(e: MouseEvent): void {

  }
}
