import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditCardSimulationsService } from '../services/credit-card-simulations.service';
import { CreditCardSimulation } from '../models';
import { ChartModule } from 'primeng/chart';
import { DialogModule } from 'primeng/dialog';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.guard';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { createLogger } from '../utils';
import { calculateCreditCardChartData, ChartData } from '../simulation-utils';
import { SimulationCardComponent } from "../simulation-card/simulation-card.component";
import { createSimulationSignals, createCreditCardForm } from '../simulation-shared';

const logger = createLogger('credit-card-simulation-component');

@Component({
  selector: 'app-credit-card-simulation',
  imports: [CommonModule, ReactiveFormsModule, ChartModule, DialogModule, ProgressSpinnerModule, SimulationCardComponent],
  templateUrl: './credit-card-simulation.component.html',
  styleUrl: './credit-card-simulation.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreditCardSimulationComponent {
  private creditCardSimService = inject(CreditCardSimulationsService);
  private authService = inject(AuthService);

  signals = createSimulationSignals<CreditCardSimulation>();
  chartDataCache = new Map<number, ChartData>();
  formGroup = createCreditCardForm();
  userId = this.authService.getId();

  constructor() {
    this.#loadSimulations();
  }

  openModal(id: number) {
    this.signals.selectedSimulation = this.signals.simulations().find(s => s.id === id);
    this.signals.detailVisible.set(true);
  }

  closeModal() {
    this.signals.detailVisible.set(false);
    this.signals.selectedSimulation = undefined;
  }

  getModalData(): ChartData | undefined {
    if (!this.signals.selectedSimulation) return;
    return calculateCreditCardChartData(this.signals.selectedSimulation);
  }

  async deleteSimulation(simulation: CreditCardSimulation) {
    if (!simulation?.id) return;
    this.signals.loading.set(true);
    try {
      await this.creditCardSimService.deleteCreditCardSimulation(this.userId, simulation.id);
      this.signals.simulations.set(this.signals.simulations().filter(s => s.id !== simulation.id));
    } catch (error) {
      logger.error('Error deleting simulation:', error);
    } finally {
      this.signals.loading.set(false);
    }
  }

  async onSubmitCreditCardSimulation() {
    const simulationData: CreditCardSimulation = this.formGroup.value;
    this.signals.newSimulationVisible.set(false);
    this.signals.loading.set(true);
    try {
      const result = await this.creditCardSimService.createCreditCardSimulation(simulationData, this.userId);
      if (result) {
        this.signals.simulations.set([...this.signals.simulations(), result]);
        this.formGroup.reset();
      }
    } catch (error) {
      logger.error('Error creating simulation:', error);
    } finally {
      this.signals.loading.set(false);
    }
  }

  getChartData(sim: CreditCardSimulation): ChartData {
    if(!this.chartDataCache.has(sim.id)) {
      this.chartDataCache.set(sim.id, calculateCreditCardChartData(sim));
    }
    return this.chartDataCache.get(sim.id)!;
  }

  async #loadSimulations() {
    this.signals.loading.set(true);
    try {
      this.signals.simulations.set(await this.creditCardSimService.getCreditCardSimulations(this.userId))
    } catch (error) {
      logger.error('Error loading simulations:', error);
    } finally {
      this.signals.loading.set(false);
    }
  }
}
