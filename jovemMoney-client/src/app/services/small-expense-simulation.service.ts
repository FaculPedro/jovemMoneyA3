import { Injectable } from '@angular/core';
import { BaseServicesService } from './base-services.service';
import { SmallExpenseSimulation } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SmallExpenseSimulationService extends BaseServicesService {
  #baseUrl = 'small-expense'

  getSmallExpenseSimulations(userId: number): Promise<SmallExpenseSimulation[]> {
    return this.httpGet<SmallExpenseSimulation[]>(`${this.#baseUrl}/user/${userId}`);
  }

  getSmallExpenseSimulationById(simId: number): Promise<SmallExpenseSimulation> {
    return this.httpGet<SmallExpenseSimulation>(`${this.#baseUrl}/${simId}`);
  }

  createSmallExpenseSimulation(simulation: SmallExpenseSimulation): Promise<SmallExpenseSimulation> {
    return this.httpPost<SmallExpenseSimulation>(`${this.#baseUrl}`, simulation);
  }

  updateSmallExpenseSimulation(simulation: SmallExpenseSimulation): Promise<SmallExpenseSimulation> {
    return this.httpPut<SmallExpenseSimulation>(`${this.#baseUrl}/${simulation.id}`, simulation);
  }

  deleteSmallExpenseSimulation(simId: number): Promise<void> {
    return this.httpDelete<void>(`${this.#baseUrl}/${simId}`);
  }
}
