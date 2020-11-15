import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Client } from 'src/app/models/client';
import { ClientsService } from 'src/app/services/clients.service';
import { AddNewClientComponent } from '../add-new-client/add-new-client.component';

import { ClientFormComponent } from '../client-form/client-form.component';

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
      this.clientsService.getClients().subscribe(x => {
      this.clientsData = x;
    });
    this.dataSource = new MatTableDataSource(this.clientsData);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  addNewClient(id:number){
    if (id != 0){
    this.takeClient = this.clientsData.filter(function(r) { return r["id"] == id })[0]||null;
    this.editForm();
    }
    else
    this.newClientForm();
  }

  editForm() {
    const dialogRef = this.dialog.open(ClientFormComponent, {
      width: '250px',
      height: '650px',
      data: {client: this.takeClient}.client
    }); 
    setTimeout(() => {
      dialogRef.close();
    }, 50000);
  }

  newClientForm() {
    const dialogRef = this.dialog.open(AddNewClientComponent, {
      width: '250px',
      height: '650px'
    }); 
    setTimeout(() => {
      dialogRef.close();
    }, 50000);

    dialogRef.afterClosed().subscribe(data => 
      {
        if(data === undefined){
          console.log(this.clientsData);
        }
        else
        this.clientsData = data;
        this.dataSource = new MatTableDataSource(this.clientsData);
      }
    );   
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}