
import { Component, Input, OnChanges, SimpleChange } from '@angular/core';

import { Treenipaiva } from '../treenipaiva';
import { TreenikalenteriService } from '../treenikalenteri.service';
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
  viikkojenLkm : number = 4;
  viikkonumerot: number[] = [];
  aloituspaiva : Date = new Date();
  viikkoOffset : number = 0;

  treenipaivalista : TreenipaivaPvm[] = [];
  @Input() userLoggedIn: boolean;
  treenipaivaTemplate: Treenipaiva = <Treenipaiva> {
    pvm : "2017-12-06",
    treenit : [],
  }

  constructor(
      private treenikalenteriService: TreenikalenteriService, 
      private router: Router
    ) {
          
     }

  ngOnInit(): void {
    this.getTreenipaivat();
    this.alustaViikkonumerot();
  }  

  alustaViikkonumerot(): void {
    this.viikkonumerot=[];
    for (let i=1;i<=this.viikkojenLkm;i++) {
      this.viikkonumerot.push(i);
    }
  }
  asetaTreeniviikot(lkm:number): void {
    this.viikkojenLkm = lkm;
    this.alustaViikkonumerot();
    this.alustaTreenipaivalista();
  }
  asetaViikkoOffset (x:number): void {
    if (x === 0) {
      this.viikkoOffset = 0;
    } else {
      this.viikkoOffset+=x;
      this.alustaTreenipaivalista();  
    }
  }

  gotoDetail(id: number): void {
    let link = ['treenipaivat/', id];
    this.router.navigate(link);
  }

  // ngClass supports array of strings also:
  getTreenipaivaClass(tp): any {
    var retVal : string[] = [];
    if (tp.weekday != 0) 
      retVal.push("myblock");
    else 
      retVal.push("myinline");
    return retVal;
  }

  laskeAloituspaiva(): void {
    var date1 = new Date( );
    var weekday = date1.getUTCDay(); // Should contain this weeks day number
    var paivienLkm = 7*this.viikkojenLkm;
    var msInDay = 1000*24*3600;
    this.aloituspaiva = new Date( + date1 + this.viikkoOffset*7*msInDay + (7-weekday-paivienLkm)*msInDay );
  }

  alustaTreenipaivalista(): void { 
    console.log("alustetaan treenipäivälista");
    this.treenipaivalista=[];
    this.laskeAloituspaiva();
    
    var paivienLkm=7*this.viikkojenLkm;
    var msInDay = 1000*24*3600;
    // Tulosta 4x7 päivämäärää alkaen 3 vkoa sitten
    for (var i=1; i<=paivienLkm; i++) {
      var tmp = new Date(+ this.aloituspaiva + i * msInDay);
      console.log("Pvm: " + tmp.toISOString().split("T")[0]);
      var tp = new TreenipaivaPvm();
      tp.pvm=tmp.toISOString().split("T")[0];
      tp.weekday=tmp.getDay();
      console.log("Weekday: " + tp.weekday);
      tp.treenipaiva=this.getTreenipaiva(tp.pvm);
      this.treenipaivalista.push(tp);
    }
    
  }
  old_alustaTreenipaivalista(): void { 
    console.log("alustetaan treenipäivälista");
    this.treenipaivalista=[];
    
    var date1 = new Date();
    var weekday = date1.getUTCDay(); // Should contain this weeks day number
    var paivienLkm=7*this.viikkojenLkm;
    // Tulosta 4x7 päivämäärää alkaen 3 vkoa sitten
    for (var i=1; i<=paivienLkm; i++) {
      var tmp = new Date(+ date1 + (i-weekday+7-paivienLkm)*1000*24*60*60);
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
      if (this.treenikalenteriService.userHasLoggedIn()) {
          var token = this.treenikalenteriService.getToken();
          this.treenikalenteriService.getTreenipaivat(token)
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
      this.treenikalenteriService.createTreenipaiva(<Treenipaiva> this.treenipaivaTemplate )
        .then(treenipaiva => {
            this.treenipaivat.push(treenipaiva);
            console.log("Luotiin uusi treenipäivä: "+ treenipaiva.id);
            console.log("Navigoidaan uudelle sivulle: /treenipaivat/"+ treenipaiva.id);
            let link = ['treenipaivat/', treenipaiva.id];
            this.router.navigate(link);
        });
  }

}