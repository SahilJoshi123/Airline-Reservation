import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder ,Validators} from '@angular/forms';
import { UserService } from '../user.service';
import { MainDataService } from '../main-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  password: string;

  addForm: FormGroup;
  result:any;
  userId: any;


  constructor(private router: Router,private formBuilder: FormBuilder,private userService: UserService, private service: MainDataService){}

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      userName: [''],
      password:[''],
    });
  }
  
  onSubmit() {
    let credential = {"emailId": this.addForm.controls.userName.value, "password":this.addForm.controls.password.value};
    if(this.addForm.invalid){
      return;
    }

    this.userService.loginUser(credential).subscribe(data =>{
      this.userId = data;
      this.result = this.userId
      
      if(this.result!=0){
          this.userService.loggedIn = true;
          this.service.ticketDetails.passengerId = this.result;
          alert('Login Successful');
          this.router.navigate(['search']);
        }
      else{
        alert('Incorrect Username or Password!');
      }
    });
  }

  

  loadRegistrationPage(){
    this.router.navigate(['register']);
  }

}
