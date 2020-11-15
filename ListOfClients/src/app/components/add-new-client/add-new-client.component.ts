import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Client } from 'src/app/models/client';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-add-new-client',
  templateUrl: './add-new-client.component.html',
  styleUrls: ['./add-new-client.component.css']
})
export class AddNewClientComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddNewClientComponent>,
    private cService: ClientsService,
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
      'name': new FormControl(''),
      'surname': new FormControl(''),
      'dateOfBirth': new FormControl(''),
      'industry': new FormControl(''),
      'subcategory': new FormControl(''),
      'telephone': new FormControl(''),
      'email': new FormControl('')
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

  onSubmit() {
    let lastId = this.clientsArray.length + 1;
    console.log(lastId);  
    const newClient = <Client> {
    id: lastId,
    name: this.editClient.value.name,
    surname: this.editClient.value.surname,
    dateOfBirth: this.editClient.value.dateOfBirth,
    industry: this.editClient.value.industry,
    subcategory: this.editClient.value.subcategory,
    telephone: this.editClient.value.telephone,
    email: this.editClient.value.email
    }
    this.clientsArray.push(newClient);
    this.dialogRef.close(this.clientsArray);
  }
}
