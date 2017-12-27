import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { TreenikalenteriService, LoginResponse } from '../treenikalenteri.service';

import { User } from '../user';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  user : User;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private treenikalenteriService: TreenikalenteriService,
  ) {}

    ngOnInit(): void {
      this.getUserDetails();
    }

    getUserDetails(): void {
        this.treenikalenteriService.getUserDetails()
            .then(loginResponse => this.user = loginResponse)
            
    }    

}

