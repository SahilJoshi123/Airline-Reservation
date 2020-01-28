import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MainDataService } from '../main-data.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  paymentForm: FormGroup;

  constructor(private service: MainDataService, private router: Router, private formBuilder: FormBuilder, private http: HttpClient, private userService: UserService) { }

  ngOnInit() {
    this.paymentForm = this.formBuilder.group({
      cardNumber: [''],
      expiryDate: [''],
      cvv: ['']
    })
  }

  result:any;
  bookResult: any;
  onSubmit(){
    let paymentDetails = {"cardNumber": this.paymentForm.controls.cardNumber.value,
                          "expiryDate": this.paymentForm.controls.expiryDate.value,
                          "cvv": this.paymentForm.controls.cvv.value,
                          "accountBalance": JSON.parse(localStorage.getItem("ticketDetails")).totalCost };

    // let paymentDetails = {"cardNumber": 1111222233334444,
    //                       "expiryDate": "12/23",
    //                       "cvv": "123",
    //                       "accountBalance": JSON.parse(localStorage.getItem("ticketDetails")).totalCost };

    let ticketDetails = JSON.parse(localStorage.getItem("ticketDetails"));
    let flightDetails = JSON.parse(localStorage.getItem("flightDetails"));

    ticketDetails.flightId = flightDetails.flightId;
    ticketDetails.departureDate = flightDetails.departureDate;
    ticketDetails.departureTime = flightDetails.departureTime;
    ticketDetails.airportName = flightDetails.airportName;
    ticketDetails.status = "Booked";
    localStorage.setItem("ticketDetails", JSON.stringify(ticketDetails))

    this.service.getPaymentConfirmation(paymentDetails).subscribe(data=>{
      this.result= data
      if(this.result!=null){
        
        this.service.bookTicket(JSON.parse(localStorage.getItem("ticketDetails"))).subscribe(data =>{
          this.bookResult = data;
          if(this.bookResult==1){
            let seatDetails = {"seats": JSON.parse(localStorage.getItem("selectedSeats")),
                                "userId": ticketDetails.passengerId,
                                "flightId": ticketDetails.flightId}
            this.service.bookSeat(seatDetails).subscribe(data=>{
              this.router.navigate(['ticketInformation'])
            });
          }
          });
      }
    });
  }
}