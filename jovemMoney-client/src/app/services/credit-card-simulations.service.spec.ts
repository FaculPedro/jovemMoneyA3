import { TestBed } from '@angular/core/testing';

import { CreditCardSimulationsService } from './credit-card-simulations.service';

describe('CreditCardSimulationsService', () => {
  let service: CreditCardSimulationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreditCardSimulationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
