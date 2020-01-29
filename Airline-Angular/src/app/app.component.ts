import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private userService: UserService, private router: Router){}

  userLoggedIn: number;
  userName:string;

  ngOnInit(){
    if(+localStorage.getItem("userId")>0){
      if(+localStorage.getItem("userId")==57){
        this.userName = "Admin"
        this.userLoggedIn = -1;
        //this.router.navigate(['addflights'])
      }
      else{
        this.userName = localStorage.getItem("userName");
        this.userLoggedIn = 1;
        //this.router.navigate(['search'])
      }
    }
    else{
      this.userLoggedIn = 0
      this.userName = 'Visitor'
      //this.router.navigate(['search'])
    }
    
  }

  loadMyProfile(){
    this.router.navigate(['ticketInformation']);
  }

  loadRegister(){
    this.router.navigate(['register'])
  }

  loadLogin(){
    this.router.navigate(['login'])
  }

  logout(){
    localStorage.setItem("userId",'0');
    alert('Logout Successful');
    this.ngOnInit();
    this.router.navigate(['search'])
  }
}
