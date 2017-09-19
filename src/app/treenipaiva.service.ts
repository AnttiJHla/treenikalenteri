import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { LoginService } from './login.service';

import 'rxjs/add/operator/toPromise';

import { Treenipaiva } from './treenipaiva';

@Injectable()
export class TreenipaivaService {

    private treenipaivatUrl = 'http://127.0.0.1:8000/tk/treenipaivat/';  // URL to web api

    constructor(
        private http: Http,
        private loginService: LoginService, 

    ) { }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    getHeaders(): any {
        var token = this.loginService.getToken();
        var headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token            
        });    
        return {"headers": headers};
    }
    getTreenipaivat(token : string): Promise<Treenipaiva[]> {
        console.log("Trying to get treenipaivat"); 
        if (this.loginService.userHasLoggedIn()) {
            return this.http.get(this.treenipaivatUrl, this.getHeaders())
                .toPromise()
                .then(response => response.json().results as Treenipaiva[])
                .catch(this.handleError);
        } else {
            return null;
        }
    }
    getTreenipaiva(id : number): Promise<Treenipaiva> {
        console.log("Trying to get treenipaiva -- " + id); 
        if (this.loginService.userHasLoggedIn()) {
            return this.http.get(this.treenipaivatUrl+id+"/", this.getHeaders())
                    .toPromise()
                    .then(response => response.json() as Treenipaiva)
                    .catch(this.handleError);
        } else {
            return null;
        }
    }
    updateTreenipaiva(treenipaiva:Treenipaiva): Promise<Treenipaiva> {
        var headers = this.getHeaders();
        return this.http
            .put(this.treenipaivatUrl+treenipaiva["id"]+"/", treenipaiva, headers)
            .toPromise()
            .then(response => response.json() as Treenipaiva)
            .catch(this.handleError);
    }


}
