import { Injectable }    from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Subject }    from 'rxjs/Subject';

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { Treenipaiva } from './treenipaiva';
import { User } from './user';

export class LoginResponse {
    email : string;
    username : string;
    token : string;
}

@Injectable()
export class TreenikalenteriService {

    private tkUrl = 'http://127.0.0.1:8000/tk/';  // URL to web api
    private loginUrl = 'http://127.0.0.1:8000/tk/login/';  // URL to web api
    private userUrl = 'http://127.0.0.1:8000/tk/user/';  // URL to web api
    private headers = new Headers({'Content-Type': 'application/json'});    
    private token : string = "";
    public loggedIn : boolean = false;
    

    // Observable string sources
    private userLoggedInSource = new Subject<boolean>();

    // Observable string streams
    userLoggedIn$ = this.userLoggedInSource.asObservable();
        
    constructor(
        private http: Http
   ) { }

    private handleError(error: any): Promise<any> {
        console.error('Service: An error occurred ', error); 
        //return Promise.reject(error.message || error);
        return Promise.reject(error);
    }

    getHeaders(): any {
        var token = this.getToken();
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token            
        };    
        return {"headers": headers};
    }        
    

    login(email: string, password: string): Promise<string> {
        var credentials = {
            email : email,
            password : password
        }
        return this.http
            .post(this.loginUrl, JSON.stringify(credentials), {headers: this.headers})
            .toPromise()
            .then(res => {
                this.token = res.json().token;
                this.loggedIn=true;
                this.userLoggedInSource.next(true);
            })            
            .catch(this.handleError);
    }
    registration(
        username    : string,
        firstname   : string,
        lastname    : string,
        phone       : string,
        organization: string,
        email       : string, 
        password    : string,
    ): Promise<string> {
        var headers = this.getHeaders();
        
        var details = {
            username    : username,
            firstname   : firstname,
            lastname    : lastname,
            phone       : phone,
            organization: organization,
            email       : email, 
            password    : password,
            }
        return this.http
            .post(this.tkUrl + "register", JSON.stringify(details), headers)
            .toPromise()
            .then(res => {
                this.token = res.json().token;
                this.loggedIn=true;
                this.userLoggedInSource.next(true);
            },
                error => {
                    throw(error)
                }
            )            
            .catch(this.handleError);
    }
    getUserDetails(): Promise<User> {
        var headers = this.getHeaders();
        return this.http
            .get(this.userUrl,headers)
            .toPromise()
            .then(response => response.json() as User)
            .catch(this.handleError);
    }
    updateUserDetails(user:User): Promise<User> {
        var headers = this.getHeaders();
        return this.http
            .put(this.userUrl, user, headers)
            .toPromise()
            .then(response => response.json() as User)
            .catch(this.handleError);
    }
    logout(): void {
        this.token="";
        this.loggedIn=false;
    }                    
    getToken(): string {
        return this.token;
    }                    
    userHasLoggedIn(): boolean {
        return this.loggedIn;
    }                    

    getTreenipaivat(): Observable<Treenipaiva[]> {
        console.log("Trying to get treenipaivat"); 
        const url = `${this.tkUrl}treenipaivat/`;

        return this.http.get(url, this.getHeaders())
        .map(this.extractTreenipaivat)
        .catch(this.handleError);
    }

    getTreenipaiva(id : number): Observable <Treenipaiva> {
        if (id === 0) {
            return Observable.of(this.initializeTreenipaiva());
        };
        const url = `${this.tkUrl}treenipaivat/${id}`;
        const headers = this.getHeaders();

        return this.http.get(url, headers)
        .map(this.extractTreenipaiva)
        .catch(this.handleError);
    }
    
    private extractTreenipaivat(response: Response) : Treenipaiva []  {
        return <Treenipaiva []> response.json().results;
    }

    private extractTreenipaiva(response: Response) : Treenipaiva  {
        return <Treenipaiva> response.json();
    }

    updateTreenipaiva(treenipaiva:Treenipaiva): Promise<Treenipaiva> {
        var headers = this.getHeaders();
        return this.http
            .put(this.tkUrl + "treenipaivat/"+treenipaiva["id"]+"/", treenipaiva, headers)
            .toPromise()
            .then(response => response.json() as Treenipaiva)
            .catch(this.handleError);
    }
    createTreenipaiva(treenipaiva:Treenipaiva): Promise<Treenipaiva> {
        var headers = this.getHeaders();
        return this.http
            .post(this.tkUrl + "treenipaivat/", treenipaiva, headers)
            .toPromise()
            .then(response => response.json() as Treenipaiva)
            .catch(this.handleError);
    }
    deleteTreenipaiva(id:number): Promise<any> {
        var headers = this.getHeaders();
        return this.http
            .delete(this.tkUrl + "treenipaivat/"+id+"/", headers)
            .toPromise()
            .then(response => response.json() as void)
            .catch(this.handleError);
    }
    deleteTreeni(id:number): Promise<any> {
        var headers = this.getHeaders();
        return this.http
            .delete(this.tkUrl + "treenit/"+id+"/", headers)
            .toPromise()
            .then(response => response.json() as void)
            .catch(this.handleError);
    }

    initializeTreenipaiva(): Treenipaiva {
        // Return an initialized object
         return <Treenipaiva> {"treenit":[]}
        
    }

}
