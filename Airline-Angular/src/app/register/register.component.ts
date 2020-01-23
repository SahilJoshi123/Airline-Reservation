import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
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

    if(this.addForm.invalid){
      return;
    }
    if(true){
    this.userService.registerUser(this.addForm.value)
      .subscribe( data => {
        
      });
      this.router.navigate(['search']);
    }
  }
}

