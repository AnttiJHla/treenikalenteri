import { Component, Input, OnChanges, SimpleChange } from '@angular/core';
import { Treenipaiva } from './treenipaiva';
import { TreenikalenteriService } from './treenikalenteri.service';
import { OnInit } from '@angular/core';
import { Router }   from '@angular/router';


@Component({
//  selector: 'treenipaivat',
  templateUrl: './treenipaivat.component.html',
  styleUrls: [ './treenipaivat.component.css' ],

})
export class TreenipaivatComponent implements OnInit, OnChanges  {
  treenipaivat: Treenipaiva[];
  @Input() userlogin: boolean;
  treenipaivaTemplate: Treenipaiva = <Treenipaiva> {
    pvm : "2017-11-30",
    treenit : [],
  }

  constructor(
      private treenikalenteriService: TreenikalenteriService, 
      private router: Router
    ) { }

  ngOnInit(): void {
    this.getTreenipaivat();
  }  

  gotoDetail(id: number): void {
    let link = ['treenipaivat/', id];
    this.router.navigate(link);
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    let log: string[] = [];
    console.log(`User trying to log in`);

    for (let propName in changes) {
      let changedProp = changes[propName];
      let to = JSON.stringify(changedProp.currentValue);
      if (changedProp.isFirstChange()) {
        console.log(`Initial value of ${propName} set to ${to}`);
      } else {
        let from = JSON.stringify(changedProp.previousValue);
        console.log(`${propName} changed from ${from} to ${to}`);
      }
    }
  }


  
  getTreenipaivat(): void { 
      if (this.treenikalenteriService.userHasLoggedIn()) {
          var token = this.treenikalenteriService.getToken();
          this.treenikalenteriService.getTreenipaivat(token)
          .then(treenipaivat => {
              this.treenipaivat = treenipaivat;
            });
      } else {
          this.treenipaivat=[];
      }
  }
}