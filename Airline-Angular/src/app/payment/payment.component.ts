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

  constructor(private service: MainDataService, private route: Router, private formBuilder: FormBuilder, private http: HttpClient, private userService: UserService) { }

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
    // let paymentDetails = {"cardNumber": this.paymentForm.controls.cardNumber.value,
    //                       "expiryDate": this.paymentForm.controls.expiryDate.value,
    //                       "cvv": this.paymentForm.controls.cvv.value,
    //                       "accountBalance": this.service.ticketDetails.totalCost };

    let paymentDetails = {"cardNumber": 1111222233334444,
                          "expiryDate": "12/23",
                          "cvv": "123",
                          "accountBalance": this.service.ticketDetails.totalCost };

    alert(this.service.ticketDetails.passengerId)
    this.service.ticketDetails.flightId = this.service.flightDetails.flightId;
    this.service.ticketDetails.departureDate = this.service.flightDetails.departureDate;
    this.service.ticketDetails.departureTime = this.service.flightDetails.departureTime;
    this.service.ticketDetails.airportName = this.service.flightDetails.airportName;
    this.service.ticketDetails.status = "Booked";

    this.service.getPaymentConfirmation(paymentDetails).subscribe(data=>{
      this.result= data
      if(this.result!=null){
        alert("Payment Successful!");
        
        this.service.bookTicket(this.service.ticketDetails).subscribe(data =>{
          this.bookResult = data;
          if(this.bookResult==1)
            alert("Ticket Booked Succesfully")
            let seatDetails = {"seats": this.service.selectedSeats,
                                "userId": this.service.ticketDetails.passengerId,
                                "flightId": this.service.ticketDetails.flightId}
            alert(seatDetails)
            this.service.bookSeat(seatDetails).subscribe(data=>{});

          });

      }
    });

    alert(this.service.ticketDetails.passengerId)
  }
}