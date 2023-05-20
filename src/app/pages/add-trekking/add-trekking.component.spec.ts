import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTrekkingComponent } from './add-trekking.component';

describe('AddTrekkingComponent', () => {
  let component: AddTrekkingComponent;
  let fixture: ComponentFixture<AddTrekkingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTrekkingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTrekkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
