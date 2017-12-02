// Keep the Input import for now, you'll remove it later:
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { LoginService } from './login.service';

import { User } from './user';
import { Treenipaiva } from './treenipaiva';

@Component({
  selector: 'login-menu',
  templateUrl: './login-menu.component.html',
  styleUrls: [ './login-menu.component.css' ]
})

export class LoginMenuComponent  implements OnInit {
    private headers = new Headers({'Content-Type': 'application/json'});    
  
    password : string = "password1234";
    email : string = "user1@live.com";
    token : string = "";
    @Output() userLoggedIn = new EventEmitter<boolean>();
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
                this.token = loginResponse;
                console.log("User logged in : " + loginResponse);
                this.loginStatus = "Kirjautunut";
            })
    }    
}

