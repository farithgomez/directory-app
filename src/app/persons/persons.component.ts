import { Component, OnInit, OnDestroy } from '@angular/core';
import { Person } from '../person';
//import { Subject } from 'rxjs';
import { PERSONS } from '../mock-persons';
import { stringify } from '@angular/compiler/src/util';

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

  }//END ON INIT

  loadTable(): void {

    $('#personsTable').DataTable().destroy();

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

    $('#personsTable').DataTable();

  }

  searchPersons(): void {

    this.foundPersons = [];

    if(this.searchTerm == undefined){
      this.foundPersons = this.persons;

    }else{

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

        //full name
        var fullName = person.firstName + ' ' + person.lastName;
        if(fullName.toUpperCase().includes(this.searchTerm.toUpperCase())){
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
    }
    
    this.loadTable();

  }

  isEmail(email: string) {
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if(!regex.test(email)) {
      return false;
    }else{
      return true;
    }
  }

  checkAddPerson(): void {

    var newPerson = new Person();
    var isFormValid = false;
    var isFirstNameValid = false;
    var isLastNameValid = false;
    var isAddressValid = false;
    var isMailValid = false;
    var isPhoneValid = false;

    //first name
    if(this.model.firstName == undefined || this.model.firstName == ''){
      $('#valFirstName').show();
      isFirstNameValid = false;
    }else{
      $('#valFirstName').hide();

      if(this.checkNumbers(this.model.firstName)){
        $('#formatFirstName').show();
        isFirstNameValid = false;
      }else{
        $('#formatFirstName').hide();
        isFirstNameValid = true;
      }
 
    }

    //last name
    if(this.model.lastName == undefined || this.model.lastName == ''){
      $('#valLastName').show();
      isLastNameValid = false;
    }else{
      $('#valLastName').hide();

      if(this.checkNumbers(this.model.lastName)){
        $('#formatLastName').show();
        isLastNameValid = false;
      }else{
        $('#formatLastName').hide();
        isLastNameValid = true;
      }

    }

    //address
    if(this.model.address == undefined || this.model.address == ''){
      $('#valAddress').show();
      isAddressValid = false;
    }else{
      $('#valAddress').hide();
      isAddressValid = true;
    }

    //mail
    if(this.model.mail == undefined || this.model.mail == ''){
      $('#valMail').show();
      isMailValid = false;
    }else{
      $('#valMail').hide();

      if(this.isEmail(this.model.mail)){
        isMailValid = true;
        $('#formatMail').hide();
      }else{
        isMailValid = false;
        $('#formatMail').show();
      }


    }

    //phone
    if(this.model.phone == undefined || this.model.phone == ''){
      $('#valPhone').show();
      isPhoneValid = false;
    }else{
      $('#valPhone').hide();

      if($.isNumeric(this.model.phone)){
        isPhoneValid = true;
        $('#formatPhone').hide();
      }else{
        isPhoneValid = false;
        $('#formatPhone').show();
      }

      
    }

    if(isFirstNameValid && isLastNameValid && isAddressValid && isMailValid && isPhoneValid){
      isFormValid = true;
    }

    if(isFormValid){
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

      alert('Person added successfully');
    }
  }

  checkNumbers(value: string){

    for(let i=0; i<value.length; i++){
      if($.isNumeric(value[i].toString())){
        return true;
      }
    }

    return false;
  }

  ngOnDestroy(): void {
    //this.dtTrigger.unsubscribe();
  }

}
