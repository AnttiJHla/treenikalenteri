import { Component, Input, OnChanges, SimpleChange, OnDestroy } from '@angular/core';
import { Treenipaiva } from './treenipaiva';
import { OnInit } from '@angular/core';
import { ActivatedRoute, Router }   from '@angular/router';
import { Subscription }   from 'rxjs/Subscription';

@Component({
  templateUrl: './treenipaivat.component.html',
  styleUrls: [ './treenipaivat.component.css' ],

})
export class TreenipaivatComponent implements OnInit  {
  treenipaivat: Treenipaiva[];
  
  constructor(
      private route: ActivatedRoute
    ) {
    }

  ngOnInit(): void {
    this.treenipaivat = this.route.snapshot.data['treenipaivat'];
  }  
  
}