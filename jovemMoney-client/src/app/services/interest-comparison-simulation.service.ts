import { Injectable } from '@angular/core';
import { BaseServicesService } from './base-services.service';
import { InterestComparisonSimulation } from '../models';
import { url } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class InterestComparisonSimulationService extends BaseServicesService {
  #baseUrl = 'api/users/USERID/interest-comparison-simulations';

  getInterestComparisonSimulations(userId: number): Promise<InterestComparisonSimulation[]> {
    return this.httpGet<InterestComparisonSimulation[]>(url(userId, this.#baseUrl, 'USERID'));
  }

  getInterestComparisonSimulationById(userId: number, simId: number): Promise<InterestComparisonSimulation> {
    return this.httpGet<InterestComparisonSimulation>(`${url(userId, this.#baseUrl, 'USERID')}/${simId}`);
  }

  createInterestComparisonSimulation(simulation: InterestComparisonSimulation, userId: number): Promise<InterestComparisonSimulation> {
    return this.httpPost<InterestComparisonSimulation>(`${url(userId, this.#baseUrl, 'USERID')}`, simulation);
  }

  updateInterestComparisonSimulation(simulation: InterestComparisonSimulation, userId: number): Promise<InterestComparisonSimulation> {
    return this.httpPut<InterestComparisonSimulation>(`${url(userId, this.#baseUrl, 'USERID')}/${simulation.id}`, simulation);
  }

  deleteInterestComparisonSimulation(userId: number, simId: number): Promise<void> {
    return this.httpDelete<void>(`${url(userId, this.#baseUrl, 'USERID')}/${simId}`);
  }
}
