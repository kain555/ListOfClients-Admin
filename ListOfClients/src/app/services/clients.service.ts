import { Injectable } from '@angular/core';
import clientsData from '../data/clients.json';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor() { }

  getClients() {
    return clientsData;
  }
}
