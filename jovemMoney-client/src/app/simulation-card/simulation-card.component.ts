import { Component, Input, Output, EventEmitter, input, output } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { CommonModule } from '@angular/common';
import { CreditCardSimulation, FinancingSimulation, InterestComparisonSimulation } from '../models';

@Component({
  selector: 'app-simulation-card',
  template: `
    <div class="w-fit h-56 flex mx-1 items-center shadow justify-center flex-col rounded-2xl p-5 relative">
      <button class="pointer-events-auto absolute top-2 right-2 cursor-pointer p-2 z-10 bg-transparent hover:bg-red-100/10 rounded-full transition" (click)="delete.emit()">
        <i class="pi pi-trash text-xl" style="color: #F97068;"></i>
      </button>
      <p-chart type="line" [data]="chartData()" class="w-full"></p-chart>
      <button
        class="pointer-events-auto z-10 bg-blue-600 text-white p-2 rounded-lg font-bold shadow hover:bg-blue-700 transition-all duration-200 mb-2 mt-2 cursor-pointer"
        (click)="details.emit()">
        Ver detalhes
      </button>
    </div>
  `,
  imports: [CommonModule, ChartModule],
})
export class SimulationCardComponent {
  simulation = input.required<CreditCardSimulation | FinancingSimulation | InterestComparisonSimulation>();
  chartData = input.required();
  delete = output();
  details = output();
}