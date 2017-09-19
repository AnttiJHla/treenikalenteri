import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { User } from './user';

export class LoginResponse {
    email : string;
    username : string;
    token : string;
}

@Injectable()
export class LoginService {

    private loginUrl = 'http://127.0.0.1:8000/tk/login/';  // URL to web api
    private userUrl = 'http://127.0.0.1:8000/tk/user/';  // URL to web api
    private headers = new Headers({'Content-Type': 'application/json'});    
    private token : string = "";
    private loggedIn : boolean = false;

    constructor(private http: Http) { }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
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
    getHeaders(): any {
        var token = this.getToken();
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token            
        };    
        return {"headers": headers};
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
}
