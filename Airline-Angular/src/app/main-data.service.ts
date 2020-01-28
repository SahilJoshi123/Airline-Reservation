import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MainDataService {
baseUrl = "http://192.168.12.118:9090/";

selectedSeats = new Array();

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

  getTicket(passengerId: number){
    return this.http.get(this.baseUrl+"ticket/"+passengerId)
  }

  bookTicket(ticketDetails: any){
    return this.http.post(this.baseUrl+"book",ticketDetails)
  }

  bookSeat(seatDetails: any){
    return this.http.post(this.baseUrl+"seats",seatDetails)
  }
}
