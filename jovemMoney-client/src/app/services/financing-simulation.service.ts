import { Injectable } from '@angular/core';
import { BaseServicesService } from './base-services.service';
import { url } from '../utils';
import { FinancingSimulation } from '../models';

@Injectable({
  providedIn: 'root'
})
export class FinancingSimulationService extends BaseServicesService {
  #baseUrl = 'api/users/USERID/financing-simulations';

  getFinancingSimulations(id: number): Promise<FinancingSimulation[]> {
    return this.httpGet(url(id, this.#baseUrl, 'USERID'));
  }

  getFinancingSimulationById(id: number): Promise<FinancingSimulation> {
    return this.httpGet(`${url(id, this.#baseUrl, 'USERID')}/${id}`);
  }

  createFinancingSimulation(financingSimulation: FinancingSimulation, userId: number): Promise<FinancingSimulation> {
    return this.httpPost<FinancingSimulation>(`${url(userId, this.#baseUrl, 'USERID')}`, financingSimulation);
  }

  updateFinancingSimulation(financingSimulation: FinancingSimulation, userId: number): Promise<FinancingSimulation> {
    return this.httpPut<FinancingSimulation>(`${url(userId, this.#baseUrl, 'USERID')}/${financingSimulation.id}`, financingSimulation);
  }

  deleteFinancingSimulation(id: number, simId: number): Promise<void> {
    return this.httpDelete<void>(`${url(id, this.#baseUrl, 'USERID')}/${simId}`);
  }

}
