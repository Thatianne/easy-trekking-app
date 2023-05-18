import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrekkingItemComponent } from './trekking-item.component';

describe('TrekkingItemComponent', () => {
  let component: TrekkingItemComponent;
  let fixture: ComponentFixture<TrekkingItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrekkingItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrekkingItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
