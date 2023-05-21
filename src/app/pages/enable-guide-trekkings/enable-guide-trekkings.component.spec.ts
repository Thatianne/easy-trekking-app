import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnableGuideTrekkingsComponent } from './enable-guide-trekkings.component';

describe('EnableGuideTrekkingsComponent', () => {
  let component: EnableGuideTrekkingsComponent;
  let fixture: ComponentFixture<EnableGuideTrekkingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnableGuideTrekkingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnableGuideTrekkingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
