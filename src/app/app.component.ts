import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { LoginService } from './login.service';

import { User } from './user';
import { Treenipaiva } from './treenipaiva';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent  implements OnInit {
    title = 'app';
    userLoggedIn : boolean = false;
    private headers = new Headers({'Content-Type': 'application/json'});    
  
    password : string = "password1234";
    email : string = "ana@live.com";   
    loginStatus="";

    constructor(
      private route: ActivatedRoute,
      private location: Location,
      private loginService: LoginService,
      private router: Router,
    ) {}

    ngOnInit(): void {
    }

    login(): void {
        this.loginService.login(this.email, this.password)
            .then(loginResponse => {
                console.log("User logged in :");
                this.userLoggedIn=true;
                this.loginStatus = "Kirjautunut";
            })
    }    
}

