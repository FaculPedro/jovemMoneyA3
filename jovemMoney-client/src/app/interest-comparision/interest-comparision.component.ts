import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterestComparisonSimulationService } from '../services/interest-comparison-simulation.service';
import { InterestComparisonSimulation } from '../models';
import { AuthService } from '../auth.guard';
import { ReactiveFormsModule } from '@angular/forms';
import { SimulationCardComponent } from '../simulation-card/simulation-card.component';
import { calculateInterestComparisonChartData, ChartData } from '../simulation-utils';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ChartModule } from 'primeng/chart';
import { createSimulationSignals, createInterestComparisonForm } from '../simulation-shared';

@Component({
  selector: 'app-interest-comparision',
  imports: [CommonModule, ReactiveFormsModule, SimulationCardComponent, DialogModule, ProgressSpinnerModule, ChartModule],
  templateUrl: './interest-comparision.component.html',
  styleUrl: './interest-comparision.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InterestComparisionComponent {
  signals = createSimulationSignals<InterestComparisonSimulation>();
  chartDataCache = new Map<number, ChartData>();
  formGroup = createInterestComparisonForm();
  userId = inject(AuthService).getId();
  private interestCompService = inject(InterestComparisonSimulationService);

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
    return calculateInterestComparisonChartData(this.signals.selectedSimulation);
  }

  async deleteSimulation(simulation: InterestComparisonSimulation) {
    if (!simulation?.id) return;
    this.signals.loading.set(true);
    try {
      await this.interestCompService.deleteInterestComparisonSimulation(this.userId, simulation.id);
      this.signals.simulations.set(this.signals.simulations().filter(s => s.id !== simulation.id));
      this.chartDataCache.delete(simulation.id);
    } finally {
      this.signals.loading.set(false);
    }
  }

  async onSubmitInterestComparisonSimulation() {
    const simulationData: InterestComparisonSimulation = this.formGroup.value;
    this.signals.newSimulationVisible.set(false);
    this.signals.loading.set(true);
    try {
      const result = await this.interestCompService.createInterestComparisonSimulation(simulationData, this.userId);
      if (result) {
        this.signals.simulations.set([...this.signals.simulations(), result]);
        this.formGroup.reset();
      }
    } finally {
      this.signals.loading.set(false);
    }
  }

  getChartData(sim: InterestComparisonSimulation): ChartData {
    if (!this.chartDataCache.has(sim.id)) {
      this.chartDataCache.set(sim.id, calculateInterestComparisonChartData(sim));
    }
    return this.chartDataCache.get(sim.id)!;
  }

  async #loadSimulations() {
    this.signals.loading.set(true);
    try {
      const sims = await this.interestCompService.getInterestComparisonSimulations(this.userId);
      this.signals.simulations.set(sims);
      this.chartDataCache.clear();
    } finally {
      this.signals.loading.set(false);
    }
  }
}
