import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder ,Validators} from '@angular/forms';
import { UserService } from '../user.service';
import { MainDataService } from '../main-data.service';
import { AppComponent } from '../app.component';

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


  constructor(private router: Router,private formBuilder: FormBuilder,private userService: UserService, private service: MainDataService, private parent: AppComponent){}

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      userName: [''],
      password:[''],
    });
  }
  result2: any;
  onSubmit() {
    let credential = {"emailId": this.addForm.controls.userName.value, "password":this.addForm.controls.password.value};
    if(this.addForm.invalid){
      return;
    }

    this.userService.loginUser(credential).subscribe(data =>{
      this.userId = data;
      this.result = this.userId
      
      if(this.result!=0){
            localStorage.setItem("userId",this.result);
            this.userService.getUserName(this.result).subscribe(data=>{
              this.result2 = JSON.parse(JSON.stringify(data));
              this.parent.ngOnInit();
              this.router.navigate(['search']);
              alert('Login Successful');
              localStorage.setItem("userName", this.result2.firstName);
          });
          
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
