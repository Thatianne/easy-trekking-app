import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrekkingFiltersComponent} from './trekking-filters.component';

describe('TrekkingFiltersComponent', () => {
  let component: TrekkingFiltersComponent;
  let fixture: ComponentFixture<TrekkingFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrekkingFiltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrekkingFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
