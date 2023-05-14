import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TouristGuideRegisterComponent } from './tourist-guide-register.component';

describe('TouristGuideRegisterComponent', () => {
  let component: TouristGuideRegisterComponent;
  let fixture: ComponentFixture<TouristGuideRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TouristGuideRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TouristGuideRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
