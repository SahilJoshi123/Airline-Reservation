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

  ngOnInit(){
    this.router.navigate(['search'])
  }

  userLoggedIn = this.userService.loggedIn;
  userName = 'Sahil';

  loadRegister(){
    this.router.navigate(['register'])
  }

  loadLogin(){
    this.router.navigate(['login'])
  }
}
