import { Component, OnInit, OnDestroy } from '@angular/core';
import { Person } from '../person';
//import { Subject } from 'rxjs';
import { PERSONS } from '../mock-persons';

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss'],
})
export class PersonsComponent implements OnDestroy, OnInit {

  constructor() {}
  
  dtOptions: DataTables.Settings = {};
  persons: Person[] = [];
  foundPersons: Person[] = [];
  searchTerm: string;
  //dtTrigger: Subject<any> = new Subject<any>();

  model: Person = new Person();
  submitted = false;

  onSubmit() { this.submitted = true }

  get diagnostic() { return JSON.stringify(this.model); }

  ngOnInit() : void {

    PERSONS.forEach(p => {
      this.persons.push(p);
    });

    this.foundPersons = [];
    this.model.id = this.persons.length + 1;

    //this.loadTable();
    //this.dtTrigger.next();
    
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      serverSide: false,
      processing: true,
      columns: [
        { data: 'id' }, 
        { data: 'firstName' }, 
        { data: 'lastName' },
        { data: 'address' },
        { data: 'mail' },
        { data: 'phone' }
      ]
    };

  }

  loadTable(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      serverSide: false,
      processing: true,
      data: this.foundPersons,
      columns: [
        { data: 'id' }, 
        { data: 'firstName' }, 
        { data: 'lastName' },
        { data: 'address' },
        { data: 'mail' },
        { data: 'phone' }
      ]
    };

  }

  searchPersons(): void {

    this.foundPersons = [];

    for(let i=0; i < this.persons.length; i++){

      let person = this.persons[i];

      //firstName
      if(person.firstName.toUpperCase().includes(this.searchTerm.toUpperCase())){
          this.foundPersons.push(person);
          continue;
      }
      //lastName
      if(person.lastName.toUpperCase().includes(this.searchTerm.toUpperCase())){
          this.foundPersons.push(person);
          continue;
      }

      //address
      if(person.address.toUpperCase().includes(this.searchTerm.toUpperCase())){
          this.foundPersons.push(person);
          continue;
      }

      //mail
      if(person.mail.toUpperCase().includes(this.searchTerm.toUpperCase())){
          this.foundPersons.push(person);
          continue;
      }

      //phone
      if(person.phone.toString().includes(this.searchTerm.toString())){
          this.foundPersons.push(person);
      }

    }//END FOR
    
    this.loadTable();

  }

  checkAddPerson(): void {

    var newPerson = new Person();

    newPerson.id = this.model.id;
    newPerson.firstName = this.model.firstName;
    newPerson.lastName = this.model.lastName;
    newPerson.address = this.model.address;
    newPerson.mail = this.model.mail;
    newPerson.phone = this.model.phone;

    this.persons.push(newPerson);
    
    //this.dtOptions.destroy;
    //this.loadTable();

    this.model = new Person();
    this.model.id = this.persons.length + 1;

  }

  ngOnDestroy(): void {
    //this.dtTrigger.unsubscribe();
  }

}