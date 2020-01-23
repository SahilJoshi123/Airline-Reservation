import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainDataService } from '../main-data.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  constructor(private router: Router, private service: MainDataService) { }

  ngOnInit() {
  }

  loadPayment(): void{
    this.router.navigateByUrl('/payment');
  }
  
  basePrice:number = this.service.basePrice;
  limit:number = this.service.limit;
  counter:number = this.service.counter;
  selectedItems: number =0;
  
  checkedState(event, checkBox) {
            if(event.target.checked === true){
              if(this.service.counter < this.limit){
              this.service.counter++;
              this.counter = this.service.counter;
            }else{
               event.target.checked = false;
            }
            }else if(this.service.counter>0){
              this.service.counter--;
              this.counter = this.service.counter;
            }
        }
}
