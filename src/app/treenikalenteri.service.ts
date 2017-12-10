import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Subject }    from 'rxjs/Subject';

import 'rxjs/add/operator/toPromise';

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
    private loggedIn : boolean = false;
    

    // Observable string sources
    private userLoggedInSource = new Subject<boolean>();

    // Observable string streams
    userLoggedIn$ = this.userLoggedInSource.asObservable();
    
    // Service message commands
    announceLoginStatus(loginStatus: boolean) {
        this.userLoggedInSource.next(loginStatus);
    }
    
    constructor(
        private http: Http
   ) { }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
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
            }
            )            
            .catch(this.handleError);
    }
    getUserDetails(): Promise<User> {
        var headers = this.getHeaders()
        return this.http
            .get(this.userUrl,headers)
            .toPromise()
            .then(response => response.json() as User)
            .catch(this.handleError);
    }
    updateUserDetails(user:User): Promise<User> {
        var headers = this.getHeaders()
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
        
    
    getTreenipaivat(token : string): Promise<Treenipaiva[]> {
        console.log("Trying to get treenipaivat"); 
        if (this.userHasLoggedIn()) {
            return this.http.get(this.tkUrl + "treenipaivat/", this.getHeaders())
                .toPromise()
                .then(response => response.json().results as Treenipaiva[])
                .catch(this.handleError);
        } else {
            return null;
        }
    }
    getTreenipaiva(id : number): Promise<Treenipaiva> {
        console.log("Trying to get treenipaiva -- " + id); 
        if (this.userHasLoggedIn()) {
            return this.http.get(this.tkUrl + "treenipaivat/"+id+"/", this.getHeaders())
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


}
