import { TestBed } from '@angular/core/testing';

import { AutomatedTasksService } from './automated-tasks.service';

describe('AutomatedTasksService', () => {
  let service: AutomatedTasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutomatedTasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
