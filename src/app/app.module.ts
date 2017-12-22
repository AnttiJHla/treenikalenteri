import { NgModule }      from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

// Imports for loading & configuring the in-memory web api
import { AppComponent }             from './app.component';
import { UserDetailComponent }      from './user-detail.component';
import { TreenipaivatComponent }    from './treenipaivat.component';
import { TreenipaivaComponent }     from './treenipaiva/treenipaiva.component';

import { TreenikalenteriService }             from './treenikalenteri.service';
import { TreenikalenteriResolver } from './treenikalenteri-resolver.service';
import { TreenipaivaResolver } from './treenipaiva-resolver.service';

import { TreeniKkComponent } from './treeni-kk/treeni-kk.component';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    UserDetailComponent,
    TreenipaivatComponent,
    TreenipaivaComponent,
    TreeniKkComponent,
    WelcomeComponent,
  ],
  providers: [ 
    TreenikalenteriService,
    TreenikalenteriResolver,
    TreenipaivaResolver

   ],
  bootstrap: [ AppComponent ],

})
export class AppModule { }