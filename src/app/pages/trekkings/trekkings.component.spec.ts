import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableTrekkingsComponent } from './trekkings.component';

describe('AvailableTrekkingsComponent', () => {
  let component: AvailableTrekkingsComponent;
  let fixture: ComponentFixture<AvailableTrekkingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailableTrekkingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvailableTrekkingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
