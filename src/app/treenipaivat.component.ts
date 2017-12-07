import { Component, Input, OnChanges, SimpleChange } from '@angular/core';
import { Treenipaiva } from './treenipaiva';
import { LoginService } from './login.service';
import { TreenipaivaService } from './treenipaiva.service';
import { OnInit } from '@angular/core';
import { Router }   from '@angular/router';


@Component({
  selector: 'treenipaivat',
  templateUrl: './treenipaivat.component.html',
  styleUrls: [ './treenipaivat.component.css' ],

})
export class TreenipaivatComponent implements OnInit, OnChanges  {
  treenipaivat: Treenipaiva[];
  @Input() userLoggedIn: boolean;
  treenipaivaTemplate: Treenipaiva = <Treenipaiva> {
    pvm : "2017-11-30",
    treenit : [],
  }

  constructor(
      private treenipaivaService: TreenipaivaService, 
      private loginService: LoginService, 
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
    }
  
  getTreenipaivat(): void { 
      if (this.loginService.userHasLoggedIn()) {
          var token = this.loginService.getToken();
          this.treenipaivaService.getTreenipaivat(token)
          .then(treenipaivat => {
              this.treenipaivat = treenipaivat;
            });
      } else {
          this.treenipaivat=[];
      }
  }
  addTreenipaiva(): void {
      console.log("Lisätään treeni");
      //this.treenipaivat.push(<Treenipaiva> {});
      this.treenipaivaService.createTreenipaiva(<Treenipaiva> this.treenipaivaTemplate )
        .then(treenipaiva => {
            this.treenipaivat.push(treenipaiva);
            console.log("Luotiin uusi treenipäivä: "+ treenipaiva);
            console.log("Navigoidaan uudelle sivulle: /treenipaivat/"+ treenipaiva.id);
            let link = ['treenipaivat/', treenipaiva.id];
            this.router.navigate(link);
        });
  }

 
//   add(name: string): void {
//     name = name.trim();
//     if (!name) { return; }
//     this.treenipaivaService.create(name)
//       .then(treenipaiva => {
//         this.treenipaivat.push(treenipaiva);
//       });
//   }
//   delete(treenipaiva: Treenipaiva): void {
//     this.treenipaivaService
//         .delete(treenipaiva.id)
//         .then(() => {
//           this.treenipaivat = this.treenipaivat.filter(h => h !== treenipaiva);
//         });
//   }    
}