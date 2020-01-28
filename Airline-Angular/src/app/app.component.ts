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

  userLoggedIn: boolean;
  userName:string;

  ngOnInit(){
    if(+localStorage.getItem("userId")>0){
      this.userLoggedIn = true;
      this.userName = localStorage.getItem("userName");
    }
    else{
      this.userLoggedIn = false
      this.userName = 'Visitor'
    }
    this.router.navigate(['search'])
  }

  loadMyProfile(){
    this.router.navigate(['userprofile']);
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
