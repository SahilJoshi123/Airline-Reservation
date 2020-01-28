import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainDataService } from '../main-data.service';
@Component({
  selector: 'app-ticketinformation',
  templateUrl: './ticketinformation.component.html',
  styleUrls: ['./ticketinformation.component.css']
})
export class TicketinformationComponent implements OnInit {

  constructor(private router:Router, private service: MainDataService) { }

  ticket:any;
  ngOnInit() {
    let flightDetails = JSON.parse(localStorage.getItem("flightDetails"));
    let ticketDetails = JSON.parse(localStorage.getItem("ticketDetails"));
    this.ticket = {
      "source": flightDetails.source,
      "destination": flightDetails.destination,
      "departureDate": flightDetails.departureDate,
      "departureTime":flightDetails.departureTime,
      "airportName": flightDetails.airportName,
      "travelClass": ticketDetails.travelClass,
      "numberOfTickets": ticketDetails.numberOfTickets,
      "seats": JSON.parse(localStorage.getItem("selectedSeats")),
      "totalCost": ticketDetails.totalCost
    };
  }

}
