import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MainDataService {
baseUrl = "http://192.168.12.118:9090/";

basePrice:number;
totalPrice:number;

selectedSeats:any[];

limit: number = 0;
flightData:any;
result: any;
flightDetails: any;

  constructor(private http: HttpClient) { }

  fetchFlights(flightSearchDetails: any){
    return this.http.post(this.baseUrl+"search",flightSearchDetails)
  }

  getSeats(flightId: number){
    return this.http.get(this.baseUrl+"seats/"+flightId);
  }

}
