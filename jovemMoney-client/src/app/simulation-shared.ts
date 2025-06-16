// Utility for shared simulation state and form creation
import { signal, WritableSignal } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

export interface SimulationSignals<T> {
  loading: WritableSignal<boolean>;
  simulations: WritableSignal<T[]>;
  detailVisible: WritableSignal<boolean>;
  newSimulationVisible: WritableSignal<boolean>;
  selectedSimulation?: T;
}

export function createSimulationSignals<T>(): SimulationSignals<T> {
  return {
    loading: signal(false),
    simulations: signal<T[]>([]),
    detailVisible: signal(false),
    newSimulationVisible: signal(false),
    selectedSimulation: undefined,
  };
}

// Example form creators for each simulation type
export function createFinancingForm(): FormGroup {
  return new FormGroup({
    itemPrice: new FormControl(0, { nonNullable: true, validators: Validators.min(0.01) }),
    downPayment: new FormControl(0, { nonNullable: true, validators: Validators.min(0) }),
    months: new FormControl(1, { nonNullable: true, validators: Validators.min(1) }),
    monthlyInterestRate: new FormControl(0, { nonNullable: true, validators: Validators.min(0) }),
    additionalFees: new FormControl(0, { nonNullable: true, validators: Validators.min(0) }),
  });
}

export function createCreditCardForm(): FormGroup {
  return new FormGroup({
    initialAmount: new FormControl(0, { nonNullable: true, validators: Validators.min(0.01) }),
    interestRate: new FormControl(0, { nonNullable: true, validators: Validators.min(0) }),
    paymentType: new FormControl('minimum', { nonNullable: true }),
    months: new FormControl(1, { nonNullable: true, validators: Validators.min(1) }),
  });
}

export function createInterestComparisonForm(): FormGroup {
  return new FormGroup({
    initialAmount: new FormControl(0, { nonNullable: true, validators: Validators.min(0.01) }),
    interestRate: new FormControl(0, { nonNullable: true, validators: Validators.min(0) }),
    months: new FormControl(1, { nonNullable: true, validators: Validators.min(1) }),
  });
}
