import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms'
import {MainDataService} from './main-data.service'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookComponent } from './book/book.component';
import { PaymentComponent } from './payment/payment.component';
import { SearchComponent } from './search/search.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AddFlightsComponent } from './add-flights/add-flights.component';

import { HttpClientModule } from '@angular/common/http';
import { UserService } from './user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { DeleteFlightComponent } from './delete-flight/delete-flight.component';
import { TicketinformationComponent } from './ticketinformation/ticketinformation.component';

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    PaymentComponent,
    SearchComponent,
    RegisterComponent,
    LoginComponent,
    AddFlightsComponent,
    DeleteFlightComponent,
    TicketinformationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [MainDataService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
