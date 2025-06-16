import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditCardSimulationComponent } from './credit-card-simulation.component';

describe('CreditCardSimulationComponent', () => {
  let component: CreditCardSimulationComponent;
  let fixture: ComponentFixture<CreditCardSimulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditCardSimulationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditCardSimulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
