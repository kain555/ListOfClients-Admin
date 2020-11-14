import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ClientsService } from 'src/app/services/clients.service';

import { ClientFormComponent } from '../client-form/client-form.component';

export interface Client {
  id: number;
  name: string;
  surname: string;
  dateOfBirth: string;
  industry:string;
  subcategory: string;
  telephone: number;
  email: string;
}

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css'],
  providers: [
    { provide: MatFormFieldControl, useExisting: ClientsListComponent }   
  ]
})
export class ClientsListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'surname', 'dataOfBirth', 'industry', 'subcategory', 'telephone', 'email', 'edit'];
  dataSource: MatTableDataSource<Client>;
  takeClient: Client;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  clientsData: any;
  constructor(public dialog: MatDialog, private clientsService: ClientsService) { 
    this.clientsData = this.clientsService.getClients();
    this.dataSource = new MatTableDataSource(this.clientsData);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  addNewClient(id:number){
    this.takeClient = this.clientsData.filter(function(r) { return r["id"] == id })[0]||null;
    this.showForm();
  }

  showForm() {
    const dialogRef = this.dialog.open(ClientFormComponent, {
      width: '250px',
      height: '660px',
      data: {client: this.takeClient}.client
    }); 
    setTimeout(() => {
      dialogRef.close();
    }, 50000);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}