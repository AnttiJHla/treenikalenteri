import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Treenipaiva } from './treenipaiva';
import { TreenipaivaService } from './treenipaiva.service';
import { Router }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { Treeni } from './treeni';

@Component({
  selector: 'treenipaiva',
  templateUrl: './treenipaiva.component.html',
  styleUrls: [ './treenipaiva.component.css' ],

})
export class TreenipaivaComponent implements OnInit  {
    treenipaiva: Treenipaiva = null;
    treeniTemplate : Treeni;

    constructor(
        private treenipaivaService: TreenipaivaService, 
        private route: ActivatedRoute,
        private router: Router,
        private location: Location,
        ) { 
            this.treeniTemplate=<Treeni>{}
        }

    ngOnInit(): void {
        this.route.paramMap
        .switchMap((params: ParamMap) => this.treenipaivaService.getTreenipaiva(+params.get('id')))
        .subscribe(treenipaiva => this.treenipaiva = treenipaiva);
    }  

    addTreeni(): void {
        console.log("Lisätään treeni");
        this.treenipaiva.treenit.push(<Treeni>this.treeniTemplate);
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
    deleteTreeni(id: number, index: number): void {
        console.log("Poistetaan treeni: " + id + " index: " + index);
        this.treenipaiva.treenit.splice(index,1);
        console.log("Treenit: " + JSON.stringify(this.treenipaiva.treenit));
        this.treenipaivaService.deleteTreeni(id)
        .then(response => {
            console.log("Poistettiin treeni");
        });
    }  
    save(): void {
        console.log("Tallennetaan treenipaiva: " + JSON.stringify(this.treenipaiva));        
        this.treenipaivaService.updateTreenipaiva(this.treenipaiva)
            .then((treenipaiva) => this.treenipaiva=treenipaiva);
    }  

    goBack(): void {
        
         
    }
  
  
  getTreenipaiva(): void { 
        this.treenipaivaService.getTreenipaiva(this.treenipaiva.id)
        .then(treenipaiva => {
            this.treenipaiva = treenipaiva;
            console.log("Luettiin treenipäivä: "+ treenipaiva);
        });
  }
    
}
