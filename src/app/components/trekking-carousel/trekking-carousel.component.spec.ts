import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrekkingCarouselComponent } from './trekking-carousel.component';

describe('TrekkingCarouselComponent', () => {
  let component: TrekkingCarouselComponent;
  let fixture: ComponentFixture<TrekkingCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrekkingCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrekkingCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
