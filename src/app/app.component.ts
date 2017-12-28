import { Component, OnInit, ViewContainerRef,  } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
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
    
    private headers = new Headers({'Content-Type': 'application/json'});    
  
    password : string = "password1234";
    email : string = "ana@live.com";   
    loginStatus = "";

    constructor(
      private route: ActivatedRoute,
      private location: Location,
      private treenikalenteriService: TreenikalenteriService,
      private router: Router,
      private toastr: ToastsManager,
      private _vcr : ViewContainerRef,
    ) {
      this.toastr.setRootViewContainerRef(_vcr);
    }

    ngOnInit(): void {
      //this.login();
    }
    
    

  login(): void {
    this.treenikalenteriService.login(this.email, this.password)
        .then(loginResponse => {
            console.log("User logged in :");
            this.userLoggedIn=true;
            this.loginStatus = "Kirjautunut";
            this.toastr.success('Kirjautuminen onnistui!');
            this.router.navigate(['welcome']);

        }, error => {
            this.toastr.error('Väärä käyttäjätunnus tai salasana? \n' + error);
        })         
        .catch(this.handleError);
  }
  logout(): void {
    this.treenikalenteriService.logout();
    this.userLoggedIn=false;
  }    

  private handleError(error: any): Promise<any> {
    console.error('An error occurred here:', error); 
    return Promise.reject(error);
    //return Promise.reject(error.message || error);
  }

}

