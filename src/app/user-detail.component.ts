// Keep the Input import for now, you'll remove it later:
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { LoginService, LoginResponse } from './login.service';

import { User } from './user';

@Component({
  selector: 'user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: [ './user-detail.component.css' ]
})

export class UserDetailComponent  implements OnInit {
    private headers = new Headers({'Content-Type': 'application/json'});    
  
    user : User;
    password : string = "password1234";
    email : string = "user1@live.com";
    loginResponse : string = "";
    token : string ="";
    myToken : string ="";

    constructor(
      private route: ActivatedRoute,
      private location: Location,
      private loginService: LoginService,
    ) {}

    ngOnInit(): void {
      this.getUserDetails();
    }

    goBack(): void {
       //this.location.back();
    }
    save(): void {
        this.loginService.updateUserDetails(this.user)
             .then(() => this.goBack());
    }    
    login(): void {
        this.loginService.login(this.email, this.password)
            .then(loginResponse => this.token = loginResponse)
            
    }    
    getUserDetails(): void {
        this.loginService.getUserDetails()
            .then(loginResponse => this.user = loginResponse)
            
    }    
    getToken(): void {
        this.myToken = this.loginService.getToken();
        console.log("My token: " + this.loginService.getToken());
    }    


}

