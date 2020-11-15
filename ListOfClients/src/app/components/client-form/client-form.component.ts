import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Client } from 'src/app/models/client';
import { ClientsService } from 'src/app/services/clients.service';


@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {
  
  constructor(
    public dialogRef: MatDialogRef<ClientFormComponent>,
    @Inject(MAT_DIALOG_DATA) public client: Client, private cService: ClientsService,
    public dialog: MatDialog){}

  editClient: FormGroup;
  clientsArray: Array<Client>;
  selectedIndustry: string;
  filtredSub: any;

  industryList = Array<any>();
  subcategory = Array<any>();

  ngOnInit(): void {
    this.industryList = this.cService.industryList;
    this.subcategory = this.cService.subcategory;
    this.filtredSub = this.subcategory;

    this.cService.getClients().subscribe(data => {
    this.clientsArray = data;
    });
    this.editClient = new FormGroup({
      'name': new FormControl(this.client.name),
      'surname': new FormControl(this.client.surname),
      'dateOfBirth': new FormControl(this.client.dateOfBirth),
      'industry': new FormControl(this.client.industry),
      'subcategory': new FormControl(this.client.subcategory),
      'telephone': new FormControl(this.client.telephone),
      'email': new FormControl(this.client.email)
    });

    this.editClient.controls['industry'].valueChanges.subscribe(change => {
      this.selectedIndustry = change;
      if(this.selectedIndustry === "Finanse")
      {
        this.filtredSub = this.subcategory.filter(x => x.category === 1);
      }
      if(this.selectedIndustry === "Media")
      {
        this.filtredSub = this.subcategory.filter(x => x.category === 2);
      }
      if(this.selectedIndustry === "Podróże")
      {
        this.filtredSub = this.subcategory.filter(x => x.category === 3);
      }
    });
  }

  onSubmit(client: Client) {
    let index = this.clientsArray.indexOf(client);
    client.name = this.editClient.value.name;
    client.surname = this.editClient.value.surname;
    client.dateOfBirth = this.editClient.value.dateOfBirth;
    client.industry = this.editClient.value.industry;
    client.subcategory = this.editClient.value.subcategory;
    client.telephone = this.editClient.value.telephone;
    client.email = this.editClient.value.email;
    this.clientsArray[index] = client;
    this.dialog.closeAll();
  }
}
