import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainDataService } from '../main-data.service';
import { FormGroup,FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  

  constructor(private router: Router,private formBuilder:FormBuilder ,private service: MainDataService) { }
  seatForm:FormGroup;
  class: string = this.service.ticketDetails.travelClass;
  tax: number;

  bookedSeats:string[]=[];
  result:any;
  ngOnInit() {
    if(this.class ==="Economy")
      this.tax = 5;
    else
      this.tax = 12;

    this.service.getSeats(this.service.flightDetails.flightId).subscribe(data =>{
      this.result = data;
      this.bookedSeats = this.result;
      
      this.bookedSeats.forEach(element => {
        this.seatForm.controls[element].disable();
        });
      });
      
    this.seatForm=this.formBuilder.group({
      A1: [''], B1: [''], C1: [''], D1: [''], E1: [''], F1: [''] ,
      A2: [''], B2: [''], C2: [''], D2: [''], E2: [''], F2: [''] ,
      A3: [''], B3: [''], C3: [''], D3: [''], E3: [''], F3: [''] ,
      A4: [''], B4: [''], C4: [''], D4: [''], E4: [''], F4: [''] ,
      A5: [''], B5: [''], C5: [''], D5: [''], E5: [''], F5: [''] ,
      A6: [''], B6: [''], C6: [''], D6: [''], E6: [''], F6: [''] ,
      A7: [''], B7: [''], C7: [''], D7: [''], E7: [''], F7: [''] ,
      A8: [''], B8: [''], C8: [''], D8: [''], E8: [''], F8: ['']
    })     
  }

  loadPayment(): void{
    this.service.ticketDetails.totalCost = (this.basePrice*this.counter)+(this.basePrice*(this.tax/100));
    this.router.navigate(['payment']);
  }
  
  basePrice:number = this.service.flightDetails.basePrice;
  limit:number = this.service.ticketDetails.numberOfTickets;
  counter:number = 0;
  selectedItems: number =0;
  
  checkedState(event, checkBox) {
            if(event.target.checked === true){
              if(this.counter < this.limit){
              this.counter++;
              let name = event.target.name
              this.service.selectedSeats.push(name)
            }else{
               event.target.checked = false;
            }
            }else if(this.counter>0){
              this.counter--;
              this.service.selectedSeats.forEach( (item, index) => {
                if(item === event.target.id) this.service.selectedSeats.splice(index,1);
              });
              
            }
        }
}


