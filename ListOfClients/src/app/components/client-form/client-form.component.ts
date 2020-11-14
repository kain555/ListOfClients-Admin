import value from '*.json';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Client } from '../clients-list/clients-list.component';


@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {
  
  constructor(
    public dialogRef: MatDialogRef<ClientFormComponent>,
    @Inject(MAT_DIALOG_DATA) public client: Client){}

  editClient: FormGroup;

  selectedIndustry: string;
  selectedSub: string;
  filtredSub: any;

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

  ngOnInit(): void {
    this.filtredSub = this.subcategory;
    this.editClient = new FormGroup({
      'name': new FormControl(this.client.name),
      'surname': new FormControl(this.client.surname),
      'dateOfBirth': new FormControl(this.client.dataOfBirth),
      'industry': new FormControl(this.client.industry),
      'subcategory': new FormControl(this.client.subcategory),
      'telephone': new FormControl(this.client.telephone),
      'email': new FormControl(this.client.email)
    })

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
    console.log(this.editClient.value);
  }

}
