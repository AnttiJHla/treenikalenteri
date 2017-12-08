
import { Component, Input, OnChanges, SimpleChange } from '@angular/core';

import { Treenipaiva } from '../treenipaiva';
import { LoginService } from '../login.service';
import { TreenipaivaService } from '../treenipaiva.service';
import { OnInit } from '@angular/core';
import { Router }   from '@angular/router';
import { TreenipaivaPvm } from "../treenipaiva-pvm";

@Component({
  templateUrl: './treeni-kk.component.html',
  styleUrls: [ './treeni-kk.component.css' ],

})
export class TreeniKkComponent implements OnInit, OnChanges  {
  treenipaivat: Treenipaiva[];
  treenipaiva:  Treenipaiva; // Only for development purposes
  viikonpaivat : string[] = ["Ma","Ti","Ke","To","Pe","La","Su"];
  viikkonumerot: number[] =[1,2,3,4];
  treenipaivalista : TreenipaivaPvm[] = [];
  @Input() userLoggedIn: boolean;
  treenipaivaTemplate: Treenipaiva = <Treenipaiva> {
    pvm : "2017-12-06",
    treenit : [],
  }

  constructor(
      private treenipaivaService: TreenipaivaService, 
      private loginService: LoginService, 
      private router: Router
    ) {
          
     }

  ngOnInit(): void {
    this.getTreenipaivat();
  }  

  gotoDetail(id: number): void {
    let link = ['treenipaivat/', id];
    this.router.navigate(link);
  }

  // ngClass supports array of strings also:
  getTreenipaivaClass(tp): any {
    var retVal : string[] = [];
    // var isSunday=false;
    // var hasKuntoindeksi = false;
    // if (tp.weekday == 0){
    //   isSunday = true;
    // }
    // if (tp.treenipaiva.kuntoindeksi != null){
    //   hasKuntoindeksi = true;
    // }
    // return {myblock: isSunday, myinline: !isSunday, green: hasKuntoindeksi}

    if (tp.weekday != 0) 
      retVal.push("myblock");
    else 
      retVal.push("myinline");
    return retVal;
  }

  alustaTreenipaivalista(): void { 
    console.log("alustetaan treenipäivälista");
    var date1 = new Date();
    var weekday = date1.getUTCDay(); // Should contain this weeks day number
    // Tulosta 4x7 päivämäärää alkaen 3 vkoa sitten
    for (var i=1; i<=28; i++) {
      var tmp = new Date(+ date1 + (i-weekday+7-28)*1000*24*60*60);
      console.log("Pvm: " + tmp.toISOString().split("T")[0]);
      var tp = new TreenipaivaPvm();
      tp.pvm=tmp.toISOString().split("T")[0];
      tp.weekday=tmp.getDay();
      console.log("Weekday: " + tp.weekday);
      tp.treenipaiva=this.getTreenipaiva(tp.pvm);
      this.treenipaivalista.push(tp);
    }
    
  }
  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    let log: string[] = [];
    console.log(`User trying to log in`);
    }

  // Find treenipaiva with date pvm
  getTreenipaiva(pvm:string): Treenipaiva { 
    var tp : Treenipaiva = null;

    for (var i = 0; i < this.treenipaivat.length; i++){
      if (this.treenipaivat[i].pvm === pvm)
        tp = this.treenipaivat[i]
    }
    return tp;
  }
  
  getTreenipaivat(): void { 
      if (this.loginService.userHasLoggedIn()) {
          var token = this.loginService.getToken();
          this.treenipaivaService.getTreenipaivat(token)
          .then(treenipaivat => {
              this.treenipaivat = treenipaivat;
              this.treenipaiva = treenipaivat[0]; // Only for development
              console.log("Treenipäivät haettu (KK-näkymä)");
              this.alustaTreenipaivalista();
            });
      } else {
          this.treenipaivat=[];
      }
  }

  addTreenipaiva(): void {
      console.log("Lisätään päivä");
      this.treenipaivaService.createTreenipaiva(<Treenipaiva> this.treenipaivaTemplate )
        .then(treenipaiva => {
            this.treenipaivat.push(treenipaiva);
            console.log("Luotiin uusi treenipäivä: "+ treenipaiva.id);
            console.log("Navigoidaan uudelle sivulle: /treenipaivat/"+ treenipaiva.id);
            let link = ['treenipaivat/', treenipaiva.id];
            this.router.navigate(link);
        });
  }

}