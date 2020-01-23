import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainDataService } from '../main-data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
   
  constructor(private router: Router, private service: MainDataService) { }
  
  ngOnInit() {
  }
  
  Location: string[] = this.service.Location;

  Travellers:number[]=[1,2,3,4,5,6,7,8,9];
  numberOfPassengers:number;
  Class: string[]=['Economy','Premium Economy','Business'];
  
  loadBookingPage(){
    
    this.router.navigateByUrl('/book');
  }

}
