import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrekkingDetailsComponent } from './trekking-details.component';

describe('TrekkingDetailsComponent', () => {
  let component: TrekkingDetailsComponent;
  let fixture: ComponentFixture<TrekkingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrekkingDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrekkingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
