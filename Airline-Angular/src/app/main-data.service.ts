import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MainDataService {
baseUrl = "http://192.168.12.118:9090/";

basePrice:number;
totalPrice:number;

selectedSeats = new Array();

flightData:any;
result: any;
flightDetails: any;

ticketDetails ={ "passengerId":0,
                          "flightId":0,
                          "departureDate": "",
                          "departureTime": "",
                          "airportName": "",
                          "travelClass": "",
                          "numberOfTickets": 0,
                          "totalCost": 0,
                          "status": ""
  };

  constructor(private http: HttpClient) { }

  fetchFlights(flightSearchDetails: any){
    return this.http.post(this.baseUrl+"search",flightSearchDetails)
  }

  getSeats(flightId: number){
    return this.http.get(this.baseUrl+"seats/"+flightId);
  }

  getPaymentConfirmation(paymentDetails: any){
    return this.http.post(this.baseUrl+"payment",paymentDetails)
  }

  bookTicket(ticketDetails: any){
    return this.http.post(this.baseUrl+"book",ticketDetails)
  }

  bookSeat(seatDetails: any){
    return this.http.post(this.baseUrl+"seats",seatDetails)
  }
}
