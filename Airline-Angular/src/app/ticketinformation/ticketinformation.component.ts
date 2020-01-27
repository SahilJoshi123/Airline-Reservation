import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-ticketinformation',
  templateUrl: './ticketinformation.component.html',
  styleUrls: ['./ticketinformation.component.css']
})
export class TicketinformationComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

}
