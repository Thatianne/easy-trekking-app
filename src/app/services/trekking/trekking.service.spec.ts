import { TestBed } from '@angular/core/testing';

import { TrekkingService } from './trekking.service';

describe('TrekkingService', () => {
  let service: TrekkingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrekkingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
