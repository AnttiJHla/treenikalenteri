import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Treenipaiva } from '../treenipaiva';
import { TreenipaivaService } from '../treenipaiva.service';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { Treeni } from '../treeni';

@Component({
  templateUrl: './create-treenipaiva.component.html',
  styleUrls: ['./create-treenipaiva.component.css']
})
export class CreateTreenipaivaComponent implements OnInit {

    treenipaiva = <Treenipaiva> {
      pvm : "2017-11-30",
      treenit : [],
    };

    dummy = {};

    treeniTemplate : Treeni;
    treenipvm : string = "";

    constructor(
        private treenipaivaService: TreenipaivaService, 
        private route: ActivatedRoute,
        private router: Router,
        private location: Location,
        ) { 
            this.treeniTemplate=<Treeni>{}           
            this.treenipaiva.pvm = "2017-11-11";
            this.route.paramMap.subscribe((params: ParamMap) => this.treenipaiva.pvm = params.get('date') );
        }

    ngOnInit(): void {
    }  

    addTreeni(): void {
        console.log("Lisätään treeni");
        this.treenipaiva.treenit.push(<Treeni>this.treeniTemplate);
    }  

    deleteTreeni(id: number, index: number): void {
        console.log("Poistetaan treeni: " + id + " index: " + index);
        this.treenipaiva.treenit.splice(index,1);
        console.log("Treenit: " + JSON.stringify(this.treenipaiva.treenit));
        this.treenipaivaService.deleteTreeni(id)
        .then(response => {
            console.log("Poistettiin treeni");
        });
    }  

    deleteTreenipaiva(): void {
        console.log("Poistetaan treenipaiva: " + this.treenipaiva.id);
        this.treenipaivaService.deleteTreenipaiva(this.treenipaiva.id)
        .then(response => {
            console.log("Poistettiin treenipäivä");
            console.log("Navigoidaan takaisin sivulle: /treenipaivat/");
            let link = ['treenipaivat/'];
            this.router.navigate(link);           
        });
    }

    save(): void {
        console.log("Tallennetaan treenipaiva: " + JSON.stringify(this.treenipaiva));        
        if (this.treenipaiva.id ) {
          this.treenipaivaService.updateTreenipaiva(<Treenipaiva> this.treenipaiva)
            .then((treenipaiva) => this.treenipaiva = <any> treenipaiva);
        } else {
          this.treenipaivaService.createTreenipaiva(<Treenipaiva> this.treenipaiva)
            .then((treenipaiva) => this.treenipaiva = <any> treenipaiva);
        }
    }  
    goBack(): void {   
         
    } 
  
  getTreenipaiva(): void { 
        this.treenipaivaService.getTreenipaiva(this.treenipaiva.id)
        .then(treenipaiva => {
            this.treenipaiva = <any> treenipaiva;
            console.log("Luettiin treenipäivä: "+ treenipaiva);
        });
  }
    
}
