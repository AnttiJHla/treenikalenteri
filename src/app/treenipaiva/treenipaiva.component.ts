import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Treenipaiva } from '../treenipaiva';
import { TreenikalenteriService } from '../treenikalenteri.service';
import { Router }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { Treeni } from '../treeni';

@Component({
  selector: 'treenipaiva',
  templateUrl: './treenipaiva.component.html',
  styleUrls: [ './treenipaiva.component.css' ],

})
export class TreenipaivaComponent implements OnInit  {
    treeniTemplate : Treeni;    
    treenipaiva = <Treenipaiva> {
      pvm : "2017-11-30",
      treenit : [],
    };

    constructor(
        private treenikalenteriService: TreenikalenteriService, 
        private route: ActivatedRoute,
        private router: Router,
        private location: Location,
        ) { 
            this.treeniTemplate=<Treeni>{}
        }

        ngOnInit(): void {
            this.route.data.subscribe(data => {
                this.onProductRetrieved(data['treenipaiva']);
            });
        }
        onProductRetrieved(treenipaiva: Treenipaiva): void {
            this.treenipaiva = treenipaiva;
    
            // if (this.treenipaiva.id === 0) {
            //     this.pageTitle = 'Add Product';
            // } else {
            //     this.pageTitle = `Edit Product: ${this.treenipaiva.treenipaivaName}`;
            // }
        }
            
            
    addTreeni(): void {
        console.log("Lisätään treeni");
        this.treenipaiva.treenit.push(<Treeni>this.treeniTemplate);
    }  
    deleteTreenipaiva(): void {
        console.log("Poistetaan treenipaiva: " + this.treenipaiva.id);
        this.treenikalenteriService.deleteTreenipaiva(this.treenipaiva.id)
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
        this.treenikalenteriService.deleteTreeni(id)
        .then(response => {
            console.log("Poistettiin treeni");
        });
    }  
    save(): void {
        console.log("Tallennetaan treenipaiva: " + JSON.stringify(this.treenipaiva));        
        if (this.treenipaiva.id ) {
          this.treenikalenteriService.updateTreenipaiva(<Treenipaiva> this.treenipaiva)
            .then((treenipaiva) => this.treenipaiva = <any> treenipaiva);
        } else {
          this.treenikalenteriService.createTreenipaiva(<Treenipaiva> this.treenipaiva)
            .then((treenipaiva) => this.treenipaiva = <any> treenipaiva);
        }
    }  

    goBack(): void {
                 
    }
  
  
//   getTreenipaiva(id:number): void { 
//         this.treenikalenteriService.getTreenipaiva(id)
//         .then(treenipaiva => {
//             this.treenipaiva = treenipaiva;
//             console.log("Luettiin treenipäivä: "+ treenipaiva);
//         });
//   }
    
}
