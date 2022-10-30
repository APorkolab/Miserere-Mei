import { TestBed } from '@angular/core/testing';

import { AllPlaceViewerService } from './all-place-viewer.service';

describe('AllPlaceViewerService', () => {
  let service: AllPlaceViewerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllPlaceViewerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
