import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { TreenikalenteriService, LoginResponse } from '../treenikalenteri.service';
import { User } from '../user';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  private headers = new Headers({'Content-Type': 'application/json'});    
  
  username    : string = "";
  firstname   : string = "";
  lastname    : string = "";
  phone       : string = "";
  organization: string = "";
  email       : string = ""; 
  password    : string = "";



  password1 : string = "password1234";
  password2 : string = "password1234";

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private treenikalenteriService: TreenikalenteriService,
  ) {
  }

  ngOnInit() {
  }

  save(): void {
    

      this.treenikalenteriService.registration(

        this.username,
        this.firstname,
        this.lastname,
        this.phone,
        this.organization,
        this.email, 
        this.password1,
      )
            .then(() => this.goBack());
  }    

  goBack() {

  }


}
