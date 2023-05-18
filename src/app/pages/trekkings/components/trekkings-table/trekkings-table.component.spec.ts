import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrekkingsTableComponent } from './trekkings-table.component';

describe('TrekkingsTableComponent', () => {
  let component: TrekkingsTableComponent;
  let fixture: ComponentFixture<TrekkingsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrekkingsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrekkingsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
