import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinancingSimulationService } from '../services/financing-simulation.service';
import { FinancingSimulation } from '../models';
import { AuthService } from '../auth.guard';
import { ReactiveFormsModule } from '@angular/forms';
import { SimulationCardComponent } from '../simulation-card/simulation-card.component';
import { calculateFinancingChartData, ChartData } from '../simulation-utils';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ChartModule } from 'primeng/chart';
import { createSimulationSignals, createFinancingForm } from '../simulation-shared';
import { SelectButton } from 'primeng/selectbutton';

@Component({
  selector: 'app-financing-simulation',
  imports: [CommonModule, ReactiveFormsModule, SimulationCardComponent, DialogModule, ProgressSpinnerModule, ChartModule, SelectButton],
  templateUrl: './financing-simulation.component.html',
  styleUrl: './financing-simulation.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FinancingSimulationComponent {
  private financingSimService = inject(FinancingSimulationService);
  private authService = inject(AuthService);

  // Use shared signals
  signals = createSimulationSignals<FinancingSimulation>();
  chartDataCache = new Map<string, ChartData>();
  chartType = signal<'price' | 'sac'>('price');
  showTotalPaid = signal(false);
  formGroup = createFinancingForm();
  userId = this.authService.getId();

  viewOptions = [
    {label: 'PRICE', value: 'price'},
    {label: 'SAC', value: 'sac'}
  ];

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
    return calculateFinancingChartData(this.signals.selectedSimulation);
  }

  async deleteSimulation(simulation: FinancingSimulation) {
    if (!simulation?.id) return;
    this.signals.loading.set(true);
    try {
      await this.financingSimService.deleteFinancingSimulation(this.userId, simulation.id);
      this.signals.simulations.set(this.signals.simulations().filter(s => s.id !== simulation.id));
      this.chartDataCache.delete(`${simulation.id}-price`);
      this.chartDataCache.delete(`${simulation.id}-sac`);
    } finally {
      this.signals.loading.set(false);
    }
  }

  async onSubmitFinancingSimulation() {
    const simulationData: FinancingSimulation = this.formGroup.value;
    this.signals.newSimulationVisible.set(false);
    this.signals.loading.set(true);
    try {
      const result = await this.financingSimService.createFinancingSimulation(simulationData, this.userId);
      if (result) {
        this.signals.simulations.set([...this.signals.simulations(), result]);
        this.formGroup.reset();
      }
    } finally {
      this.signals.loading.set(false);
    }
  }

  getChartData(sim?: FinancingSimulation): ChartData {
    const type = this.chartType();
    const showTotal = this.showTotalPaid();
    const cacheKey = sim ? `${sim?.id}-${type}-${showTotal}` : `${this.signals.selectedSimulation?.id}-${type}-${showTotal}`;
    if (!this.chartDataCache.has(cacheKey)) {
      this.chartDataCache.set(cacheKey, calculateFinancingChartData(sim!, type, showTotal));
    }
    return this.chartDataCache.get(cacheKey)!;
  }

  async #loadSimulations() {
    this.signals.loading.set(true);
    try {
      const sims = await this.financingSimService.getFinancingSimulations(this.userId);
      this.signals.simulations.set(sims);
      this.chartDataCache.clear();
    } finally {
      this.signals.loading.set(false);
    }
  }
}
