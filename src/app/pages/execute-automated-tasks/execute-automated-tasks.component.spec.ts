import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecuteAutomatedTasksComponent } from './execute-automated-tasks.component';

describe('ExecuteAutomatedTasksComponent', () => {
  let component: ExecuteAutomatedTasksComponent;
  let fixture: ComponentFixture<ExecuteAutomatedTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExecuteAutomatedTasksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExecuteAutomatedTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
