import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrekkingDescriptionComponent } from './trekking-description.component';

describe('TrekkingDescriptionComponent', () => {
  let component: TrekkingDescriptionComponent;
  let fixture: ComponentFixture<TrekkingDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrekkingDescriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrekkingDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
