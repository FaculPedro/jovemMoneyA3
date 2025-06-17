import { TestBed } from '@angular/core/testing';

import { InterestComparisonSimulationService } from './interest-comparison-simulation.service';

describe('InterestComparisonSimulationService', () => {
  let service: InterestComparisonSimulationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterestComparisonSimulationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
