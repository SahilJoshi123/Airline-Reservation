import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MainDataService } from '../main-data.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  addForm: FormGroup;
  flightSearchDetails: any;
  data: any;
  flightData: any;
  result:any;
   
  constructor(private router: Router, private service: MainDataService, private formBuilder: FormBuilder) { }
  
  ngOnInit() {    
    this.addForm = this.formBuilder.group({
      travelType:[''],
      source: [''],
      destination:[''],
      departureDate: [''],
      returnDate: [''],
      count: [''],
      class: ['']
    });
  }
  
  Location: string[] = ['--Select--','Mumbai', 'Bangalore', 'Delhi','Hyderabad'];

  Travellers:number[]=[0,1,2,3,4,5,6,7,8,9];
  Class: string[]=['--Select--','Economy','Business'];
  
  
  loadFlightDetails(data){
  
     let date = new Date(this.addForm.controls.departureDate.value);
     let dateArray: string[] = date.toString().split(" ");
     let formattedDate = dateArray[2]+"-"+dateArray[1]+"-"+dateArray[3].substring(2,4);

     this.flightSearchDetails = {
      "source":this.addForm.controls.source.value,
       "destination":this.addForm.controls.destination.value,
       "destinationDate":formattedDate,
       "seats": this.addForm.controls.count.value
     };
    
    // this.flightSearchDetails = {
    //   "source":"Mumbai",
    //   "destination":"Delhi",
    //   "destinationDate":"03-Feb-20",
    //   "seats": "1"
    // };
    this.service.fetchFlights(this.flightSearchDetails).subscribe(result =>{
      this.data = result;
      this.flightData = this.data;
    });
  }

  loadBookingPage(data){
    if(+localStorage.getItem("userId")>0){
    data.departureDate = data.departureDate.split(' ')[0];
    let ticketDetails ={ "passengerId":0,
                          "flightId":0,
                          "departureDate": "",
                          "departureTime": "",
                          "airportName": "",
                          "travelClass": "",
                          "numberOfTickets": 0,
                          "totalCost": 0,
                          "status": ""
  };
  ticketDetails.passengerId = +localStorage.getItem("userId");
    ticketDetails.numberOfTickets = this.addForm.controls.count.value;
    ticketDetails.travelClass = this.addForm.controls.class.value;
    localStorage.setItem("ticketDetails", JSON.stringify(ticketDetails));
    localStorage.setItem("flightDetails", JSON.stringify(data));
    this.router.navigate(['book']);
  }
  else{
    alert('Please Login to Book Flights!');
  }
}
}