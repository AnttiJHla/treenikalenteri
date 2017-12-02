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
  selectedTreenipaiva: Treenipaiva;
  treenipaivat: Treenipaiva[];
  @Input() userLoggedIn: boolean;

  constructor(
      private treenipaivaService: TreenipaivaService, 
      private loginService: LoginService, 
      private router: Router
    ) { }

  ngOnInit(): void {
    this.getTreenipaivat();
  }  

  gotoDetail(id: number): void {
    let link = ['http://127.0.0.1:8000/treenipaivat/', id];
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
              this.selectedTreenipaiva = this.treenipaivat[1];
            });
      } else {
          this.treenipaivat=[];
      }
  }
//   add(name: string): void {
//     name = name.trim();
//     if (!name) { return; }
//     this.treenipaivaService.create(name)
//       .then(treenipaiva => {
//         this.treenipaivat.push(treenipaiva);
//         this.selectedTreenipaiva = null;
//       });
//   }
//   delete(treenipaiva: Treenipaiva): void {
//     this.treenipaivaService
//         .delete(treenipaiva.id)
//         .then(() => {
//           this.treenipaivat = this.treenipaivat.filter(h => h !== treenipaiva);
//           if (this.selectedTreenipaiva === treenipaiva) { this.selectedTreenipaiva = null; }
//         });
//   }    
}