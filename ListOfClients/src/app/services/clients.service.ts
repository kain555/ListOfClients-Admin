import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import clientsData from '../data/clients.json';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor() { }

  industryList = [
    { name: "Finanse", value: 1 },
    { name: "Media", value: 2 },
    { name: "Podróże", value: 3 }
  ];

  subcategory = [
    { name: "Bank", category: 1 },
    { name: "Ubezpieczalnia", category: 1 },
    { name: "TV", category: 2 },
    { name: "Radio", category: 2 },
    { name: "Krajowe", category: 3 },
    { name: "Zagraniczne", category: 3 }
  ];

  getClients(): Observable<Array<Client>> {
    const obClients=of(clientsData);
    return obClients
  }

  getIndustry(){
    return this.industryList;
  }

  getSubcategory() {
    return this.subcategory;
  }
}
