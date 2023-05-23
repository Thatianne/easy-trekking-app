import { Component, Input, OnInit } from '@angular/core';
import { Group } from '@models/group';

@Component({
  selector: 'app-groups-table',
  templateUrl: './groups-table.component.html',
  styleUrls: ['./groups-table.component.scss']
})
export class GroupsTableComponent implements OnInit {
  @Input() groups!: Group[] | null;

  constructor() {}

  ngOnInit(): void {
  }
}
