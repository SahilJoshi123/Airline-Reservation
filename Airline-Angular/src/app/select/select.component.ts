import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainDataService } from '../main-data.service';
@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {
  constructor(private router: Router, private service: MainDataService) { }
  
  flightData: any = this.service.flightData;

  ngOnInit() {
  }

  
  
}
