import { NgModule }      from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

// Imports for loading & configuring the in-memory web api
import { AppComponent }             from './app.component';
import { UserDetailComponent }      from './user-detail.component';
import { LoginMenuComponent }       from './login-menu.component';
import { TreenipaivatComponent }    from './treenipaivat.component';
import { TreenipaivaComponent }     from './treenipaiva.component';
import { TreenilistaComponent }     from './treenilista.component';
import { LoginService }             from './login.service';
import { TreenipaivaService }       from './treenipaiva.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    UserDetailComponent,
    LoginMenuComponent,
    TreenipaivatComponent,
    TreenipaivaComponent,
    TreenilistaComponent,
  ],
  providers: [ 
    LoginService,
    TreenipaivaService
   ],
  bootstrap: [ AppComponent ],

})
export class AppModule { }