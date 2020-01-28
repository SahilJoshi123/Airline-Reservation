import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-add-flights',
  templateUrl: './add-flights.component.html',
  styleUrls: ['./add-flights.component.css']
})
export class AddFlightsComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  nextPage()
  {
    this.router.navigate(['/addflights']);
    alert("Flight added.");
  }
  deleteFlight()
  {
    this.router.navigate(['/addflights']);
    alert("Flight deleted.");
  }

}
