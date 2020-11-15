import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  showSubCategory = false;
  submitted = false;
  
  newClient: Client;
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
      'name': new FormControl('', Validators.required),
      'surname': new FormControl('', Validators.required),
      'dateOfBirth': new FormControl('', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]),
      'industry': new FormControl('', Validators.required),
      'subcategory': new FormControl({value: '', disabled: true}, Validators.required),
      'telephone': new FormControl('', [Validators.required, Validators.pattern("[0-9 ]{9}")]),
      'email': new FormControl('', [Validators.email, Validators.required])
    });

    this.editClient.controls['industry'].valueChanges.subscribe(change => {
      this.selectedIndustry = change;
      this.showSubCategory = true;
      this.editClient.controls['subcategory'].enable();
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
    this.submitted = true;

    if (this.editClient.invalid)
    {
      return;
    }
    let lastId = this.clientsArray.length + 1;
    this.newClient = {
    id: lastId,
    name: this.editClient.value.name,
    surname: this.editClient.value.surname,
    dateOfBirth: this.editClient.value.dateOfBirth,
    industry: this.editClient.value.industry,
    subcategory: this.editClient.value.subcategory,
    telephone: this.editClient.value.telephone,
    email: this.editClient.value.email
    }
    this.clientsArray.push(this.newClient);
    this.dialogRef.close(this.clientsArray);
  }
}
