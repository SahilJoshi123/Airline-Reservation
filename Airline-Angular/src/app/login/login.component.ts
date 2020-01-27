import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder ,Validators} from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  password: string;

  addForm: FormGroup;
  result:any;


  constructor(private router: Router,private formBuilder: FormBuilder,private userService: UserService){}

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
      this.result = JSON.parse(JSON.stringify(data));

      if(this.result!=null){
        let pass = this.result["password"]

        if(pass == this.password){
          this.userService.loggedIn = true;
          alert('Login Successful');
          this.router.navigate(['search']);
        }
        else{
          alert('Incorrect Username or Password!');
        }
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
