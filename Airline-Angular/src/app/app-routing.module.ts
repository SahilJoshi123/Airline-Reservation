import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookComponent } from './book/book.component';
import { PaymentComponent } from './payment/payment.component';
import { SearchComponent } from './search/search.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AddFlightsComponent } from './add-flights/add-flights.component';
import { TicketinformationComponent} from './ticketinformation/ticketinformation.component';

const routes: Routes = [
  {path:"book", component:BookComponent},
  {path:"payment", component:PaymentComponent},
  {path:"search", component:SearchComponent},
  {path:"login", component:LoginComponent},
  {path:"register", component:RegisterComponent},
  {path:"addflights",component:AddFlightsComponent},
  {path:"ticketinformation", component:TicketinformationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
