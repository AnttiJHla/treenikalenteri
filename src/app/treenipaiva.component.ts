import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Treenipaiva } from './treenipaiva';
import { TreenipaivaService } from './treenipaiva.service';
import { Router }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'treenipaiva',
  templateUrl: './treenipaiva.component.html',
  styleUrls: [ './treenipaiva.component.css' ],

})
export class TreenipaivaComponent implements OnInit  {
    treenipaiva: Treenipaiva = null;
    //@Input() treenipaivax: Treenipaiva;


    constructor(
        private treenipaivaService: TreenipaivaService, 
        private route: ActivatedRoute,
        private location: Location,
        ) { }

    ngOnInit(): void {
        this.route.paramMap
        .switchMap((params: ParamMap) => this.treenipaivaService.getTreenipaiva(+params.get('id')))
        .subscribe(treenipaiva => this.treenipaiva = treenipaiva);
    }  

    add(): void {
        console.log("Lisätään treeni");
    }  
    delete(): void {
        console.log("Poistetaan treeni");
    }  
    save(): void {
        this.treenipaivaService.updateTreenipaiva(this.treenipaiva)
            .then(() => this.goBack());
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
