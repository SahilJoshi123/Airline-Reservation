import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainDataService } from '../main-data.service';
import { AppComponent } from '../app.component';
@Component({
  selector: 'app-ticketinformation',
  templateUrl: './ticketinformation.component.html',
  styleUrls: ['./ticketinformation.component.css']
})
export class TicketinformationComponent implements OnInit {

  constructor(private router:Router, private service: MainDataService, private parent: AppComponent) { }

  tickets:any = [];
  result: any;
  result2: any;
  ngOnInit() {
    this.service.getTicket(+localStorage.getItem("userId")).subscribe(data =>{
      this.result = JSON.parse(JSON.stringify(data));
      this.result.forEach(element => {
        let ticket = {
          "ticketNumber": element.ticketNumber,
          "source": element.source,
          "destination": element.destination,
          "departureDate": element.departureDate,
          "departureTime":element.departureTime,
          "airportName": element.airportName,
          "travelClass": element.travelClass,
          "numberOfTickets": element.numberOfTickets,
          "seats": [],
          "totalCost": element.totalCost
        }
        this.service.getUserSeats(+element.flightId, +element.passengerId).subscribe(data =>{
          this.result2 = data;
          ticket.seats = this.result2
          this.tickets.push(ticket)
        })
      });
    })
  }

  cancel(ticketNumber: number){
    if(confirm("Are you sure to cancel?")){
    this.service.cancelTicket(ticketNumber).subscribe(data =>{
      this.ngOnInit();
    })
  }
  }

}
