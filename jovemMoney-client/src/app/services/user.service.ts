import { Injectable } from '@angular/core';
import { BaseServicesService } from './base-services.service';
import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseServicesService {
  #baseUrl = 'users';

  getUsers(): Promise<User[]> {
    return this.httpGet(this.#baseUrl);
  }

  getUserById(id: number): Promise<User> {
    return this.httpGet(`${this.#baseUrl}/${id}`);
  }

  createUser(user: Partial<User>): Promise<User> {
    return this.httpPost<User>(this.#baseUrl, user);
  }

  updateUser(user: User): Promise<User> {
    return this.httpPut<User>(`${this.#baseUrl}/${user.id}`, user);
  }

  deleteUser(id: number): Promise<void> {
    return this.httpDelete<void>(`${this.#baseUrl}/${id}`);
  }

  login(cpf: string, password: string): Promise<User> {
    return this.httpPost<User>(`login`, { cpf, password });
  }
}
