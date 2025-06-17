import { TestBed } from '@angular/core/testing';

import { FinancingSimulationService } from './financing-simulation.service';

describe('FinancingSimulationService', () => {
  let service: FinancingSimulationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinancingSimulationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
