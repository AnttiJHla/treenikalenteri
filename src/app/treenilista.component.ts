import { Component, Input } from '@angular/core';
import { Treeni } from './treeni';
import { OnInit } from '@angular/core';
import { Router }   from '@angular/router';


@Component({
  selector: 'treenilista',
  templateUrl: './treenilista.component.html',
  styleUrls: [ './treenilista.component.css' ],

})
export class TreenilistaComponent implements OnInit  {
  selectedTreeni: Treeni;
  @Input() treenit: Treeni[];

  constructor(
      private router: Router
    ) { }

  ngOnInit(): void {
  }  

  onSelect(treeni: Treeni): void {
    this.selectedTreeni = treeni;
  }
  add(treeni: Treeni): void {
    var treeni = new Treeni;
    this.treenit.push();
    console.log("Lisätään treeni");
  }
  remove(treeni: Treeni): void {
    console.log("Poistetaan treeni : " + treeni.id);
  }
  
}
