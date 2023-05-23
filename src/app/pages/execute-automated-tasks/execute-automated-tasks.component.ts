import { Component } from '@angular/core';
import { AutomatedTasksService } from '@services/automated-tasks/automated-tasks.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-execute-automated-tasks',
  templateUrl: './execute-automated-tasks.component.html',
  styleUrls: ['./execute-automated-tasks.component.scss']
})
export class ExecuteAutomatedTasksComponent {

  constructor(private _automatedTasksService: AutomatedTasksService) {}

  inviteTouristGuides(): void {
    this._automatedTasksService.inviteTouristGuides().pipe(take(1)).subscribe();
  }

  doneGroups(): void {
    this._automatedTasksService.doneGroups().pipe(take(1)).subscribe();
  }

  cancelGroups(): void {
    this._automatedTasksService.cancelGroups().pipe(take(1)).subscribe();
  }
}
