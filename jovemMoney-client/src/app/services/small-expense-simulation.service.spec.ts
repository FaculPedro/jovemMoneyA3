import { TestBed } from '@angular/core/testing';

import { SmallExpenseSimulationService } from './small-expense-simulation.service';

describe('SmallExpenseSimulationService', () => {
  let service: SmallExpenseSimulationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmallExpenseSimulationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
