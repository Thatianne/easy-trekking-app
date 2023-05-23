import { Component, OnInit } from '@angular/core';
import { Group } from '@models/group';
import { GroupsService } from '@services/groups/groups.service';
import { Observable, take } from 'rxjs';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  groups$!: Observable<Group[]>;

  constructor(private _groupsService: GroupsService) {}

  ngOnInit(): void {
    this.groups$ = this._groupsService.get();
  }
}
