import { Component, Input, OnInit } from '@angular/core';
import { Group } from '@models/group';
import { GroupStatusLabel } from './constants/group-status-label'
import { GroupStatusClass } from './constants/group-status-class'

@Component({
  selector: 'app-groups-table',
  templateUrl: './groups-table.component.html',
  styleUrls: ['./groups-table.component.scss']
})
export class GroupsTableComponent implements OnInit {
  @Input() groups!: Group[] | null;

  groupStatusLabel = GroupStatusLabel;
  groupStatusClass = GroupStatusClass;

  constructor() {}

  ngOnInit(): void {
  }
}
