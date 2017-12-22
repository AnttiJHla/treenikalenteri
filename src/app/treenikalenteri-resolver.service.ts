import { Injectable }    from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from  'rxjs/Observable';

import { TreenikalenteriService } from './treenikalenteri.service';
import { Treenipaiva } from './treenipaiva';
import { User } from './user';

@Injectable()
export class TreenikalenteriResolver implements Resolve <Treenipaiva[]>{

    constructor (private treenikalenteriService : TreenikalenteriService){

    }

    resolve(route : ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable <Treenipaiva[]>
    {
        return this.treenikalenteriService.getTreenipaivat()
        .map(treenipaivat => {
            return treenipaivat;
        })
    }


}
