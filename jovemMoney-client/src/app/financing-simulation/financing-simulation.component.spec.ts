import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancingSimulationComponent } from './financing-simulation.component';

describe('FinancingSimulationComponent', () => {
  let component: FinancingSimulationComponent;
  let fixture: ComponentFixture<FinancingSimulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancingSimulationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancingSimulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
