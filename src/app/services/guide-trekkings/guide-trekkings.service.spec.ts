import { TestBed } from '@angular/core/testing';

import { GuideTrekkingsService } from './guide-trekkings.service';

describe('GuideTrekkingsService', () => {
  let service: GuideTrekkingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuideTrekkingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
