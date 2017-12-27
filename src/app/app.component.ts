import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { TreenikalenteriService } from './treenikalenteri.service';

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
    @Output() userlogin: EventEmitter<any> = new EventEmitter();

    private headers = new Headers({'Content-Type': 'application/json'});    
  
    password : string = "password1234";
    email : string = "ana@live.com";   
    loginStatus="";

    constructor(
      private route: ActivatedRoute,
      private location: Location,
      private treenikalenteriService: TreenikalenteriService,
      private router: Router,
    ) {}

    ngOnInit(): void {
      //this.login();
    }
    
    

  login(): void {
    this.treenikalenteriService.login(this.email, this.password)
        .then(loginResponse => {
            console.log("User logged in :");
            this.userLoggedIn=true;
            this.loginStatus = "Kirjautunut";
            this.userlogin.emit(true);
            this.router.navigate(['welcome']);

        })
  }
  logout(): void {
    this.treenikalenteriService.logout();
    this.userLoggedIn=false;
  }    
}

