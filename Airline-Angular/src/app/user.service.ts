import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = "http://192.168.12.118:9090/";
  constructor(private http: HttpClient) { }

  registerUser(user: User){
    return this.http.post(this.baseUrl, user);
  }
}
