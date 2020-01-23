import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainDataService {
counter:number = 0;
basePrice:number = 1234;
limit: number = 3;
Location: string[] = ['','Mumbai', 'Bangalore', 'Delhi','Hyderabad'];
flightData:any=[
  
    {flight_name:"IndiGo", flight_id:"6E-2977",source:"Bengalore",source_time:"10:10",destination:"Mumbai",destination_time:"12:10",price:"2000"},
    {flight_name:"Air India", flight_id:"AI-2901",source:"Bengalore",source_time:"12:30",destination:"Mumbai",destination_time:"14:00",price:"9000"},
    {flight_name:"AirAsia", flight_id:"I5-2979",source:"Bengalore",source_time:"15:30",destination:"Mumbai",destination_time:"20;00",price:"8000"},
    {flight_name:"Spicejet", flight_id:"SG-2976",source:"Bengalore",source_time:"15:45",destination:"Mumbai",destination_time:"16:30",price:"7000"},
];
  constructor() { }
}
