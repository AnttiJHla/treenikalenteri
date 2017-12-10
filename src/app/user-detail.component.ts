// Keep the Input import for now, you'll remove it later:
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { TreenikalenteriService, LoginResponse } from './treenikalenteri.service';

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
      private treenikalenteriService: TreenikalenteriService,
    ) {}

    ngOnInit(): void {
      this.getUserDetails();
    }

    goBack(): void {
       //this.location.back();
    }
    save(): void {
        this.treenikalenteriService.updateUserDetails(this.user)
             .then(() => this.goBack());
    }    
    login(): void {
        this.treenikalenteriService.login(this.email, this.password)
            .then(loginResponse => this.token = loginResponse)
            
    }    
    getUserDetails(): void {
        this.treenikalenteriService.getUserDetails()
            .then(loginResponse => this.user = loginResponse)
            
    }    
    getToken(): void {
        this.myToken = this.treenikalenteriService.getToken();
        console.log("My token: " + this.treenikalenteriService.getToken());
    }    


}

