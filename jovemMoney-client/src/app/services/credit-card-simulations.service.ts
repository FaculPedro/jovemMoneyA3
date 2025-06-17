import { Injectable } from '@angular/core';
import { BaseServicesService } from './base-services.service';
import { CreditCardSimulation } from '../models';
import { url } from '../utils';


@Injectable({
  providedIn: 'root'
})
export class CreditCardSimulationsService extends BaseServicesService {
  #baseUrl = 'api/USERID/credit-card-simulations';

  getCreditCardSimulations(id: number): Promise<CreditCardSimulation[]> {
    return this.httpGet(url(id, this.#baseUrl, 'USERID'));
  }

  getCreditCardSimulationById(id: number, creditCardId: string): Promise<CreditCardSimulation> {
    return this.httpGet(`${url(id, this.#baseUrl, 'USERID')}/${creditCardId}`);
  }

  createCreditCardSimulation(creditCardSimulation: CreditCardSimulation, userId: number): Promise<CreditCardSimulation> {
    return this.httpPost<any>(`${url(userId, this.#baseUrl, 'USERID')}`, creditCardSimulation);
  }

  updateCreditCardSimulation(creditCardSimulation: CreditCardSimulation): Promise<CreditCardSimulation> {
    return this.httpPut<any>(`${url(creditCardSimulation.user.id, this.#baseUrl, 'USERID')}/${creditCardSimulation.id}`, creditCardSimulation);
  }

  deleteCreditCardSimulation(userId: number, creditCardId: number): Promise<void> {
    return this.httpDelete<void>(`${url(userId, this.#baseUrl, 'USERID')}/${creditCardId}`);
  }
}
