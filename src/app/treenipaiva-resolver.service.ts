import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import { TreenikalenteriService } from './treenikalenteri.service';
import { Treenipaiva } from './treenipaiva';

@Injectable()
export class TreenipaivaResolver implements Resolve<Treenipaiva> {

    constructor(private treenikalenteriService: TreenikalenteriService,
                private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Treenipaiva> {
        let id = route.params['id'];
        let date = route.params['date'];
        return this.treenikalenteriService.getTreenipaiva(+id)
            .map(treenipaiva => {
                    let tp = treenipaiva;
                    if (tp.pvm === undefined) {
                        tp.pvm = date;
                    }
                    return tp;
            })
    }
}
