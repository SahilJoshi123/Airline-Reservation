import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MainDataService } from '../main-data.service';
@Component({
  selector: 'app-add-flights',
  templateUrl: './add-flights.component.html',
  styleUrls: ['./add-flights.component.css']
})
export class AddFlightsComponent implements OnInit {

  constructor(private router:Router, private formBuilder: FormBuilder, private service: MainDataService) { }

  addFlights: FormGroup;

  deleteFlight: FormGroup;
  
  result: any;

  ngOnInit() {
    this.addFlights = this.formBuilder.group({
      airportName: [''],
      airlineName: [''],
      source: [''],
      destination: [''],
      departureDate: [''],
      departureTime: [''],
      arrivalTime: [''],
      duration: [''],
      basePrice: ['']
    });

    this.deleteFlight = this.formBuilder.group({
      flightId: ['']
    });
  }
  addFlight(){
    let date = new Date(this.addFlights.controls.departureDate.value);
    let dateArray: string[] = date.toString().split(" ");
    let formattedDate = dateArray[2]+"-"+dateArray[1]+"-"+dateArray[3].substring(2,4);
    
    let flightDetails = {
        "airportName": this.addFlights.controls.airportName.value,
        "airlineName": this.addFlights.controls.airlineName.value,
        "source": this.addFlights.controls.source.value,
        "destination": this.addFlights.controls.destination.value,
        "departureDate": formattedDate,
        "departureTime": this.addFlights.controls.departureTime.value,
        "arrivalTime": this.addFlights.controls.arrivalTime.value,
        "duration": this.addFlights.controls.duration.value,
        "basePrice": this.addFlights.controls.basePrice.value
    }

    this.service.addFlight(flightDetails).subscribe(data =>{
      this.result = data
      if(this.result == 1){
        alert("Flight added.");
        this.addFlights.reset();
        this.router.navigate(['/addflights']);
      }
      else{
        alert("Could Not Add The Flight");
        this.router.navigate(['/addflights']);
      }
    });
    
  }

  deleteFlightById(){
    this.service.deleteFlight(this.deleteFlight.controls.flightId.value).subscribe(data=>{
      this.result = data;

      if(this.result > 0){
        alert("Flight deleted.");
        this.deleteFlight.reset();
      }
      else{
        alert("Could not delete the Flight");
      }
    })
    
  }

}
