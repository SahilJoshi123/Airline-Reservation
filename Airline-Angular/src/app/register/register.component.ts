import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder} from '@angular/forms';
import { UserService } from '../user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  password: string;
  confirmPassword: string;

  addForm: FormGroup;

  result: any;

  

  constructor(private formBuilder: FormBuilder, private router: Router, 
    private userService: UserService) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      firstName: [''],
      lastName:[''],
      email: [''],
      gender: [''],
      emailId: [''],
      mobileNumber:[''],
      age: [''],
      password: ['']
    });
   }

    onSubmit() {
    let credential = {"emailId": this.addForm.controls.emailId.value, "password":this.addForm.controls.password.value};
    if(this.addForm.invalid){
      return;
    }
      this.userService.loginUser(credential).subscribe(data =>{
      this.result = data;
    })

      if(this.password==this.confirmPassword){
        if(this.result==null)
        {
          alert('User Already exists. Please Login.');
        }
      else{
        alert("Login Successful. ")
        this.userService.loggedIn = true;
        this.userService.registerUser(this.addForm.value)
      .subscribe( data => {
        
      });
      this.router.navigate(['search']);
      }
    }
    else{
      alert("Password mismatch!");
      this.confirmPassword='';
      }
  }

  loadLoginPage(){
    this.router.navigate(['login']);
  }
}

