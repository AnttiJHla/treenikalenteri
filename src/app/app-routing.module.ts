import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserDetailComponent }   from './user-detail.component';
import { TreenipaivatComponent }      from './treenipaivat.component';
import { TreenipaivaComponent }      from './treenipaiva/treenipaiva.component';
import { TreeniKkComponent }      from './treeni-kk/treeni-kk.component';
import { WelcomeComponent }      from './welcome/welcome.component';
import { LogoutComponent }      from './logout/logout.component';
import { RegistrationComponent }      from './registration/registration.component';

import { TreenikalenteriResolver } from './treenikalenteri-resolver.service';
import { TreenipaivaResolver } from './treenipaiva-resolver.service';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: '/welcome', 
    pathMatch: 'full' 
  },
  { 
    path: 'welcome',  
    component: WelcomeComponent
  },
  { 
    path: 'treenipaivat/lista',  
    component: TreenipaivatComponent,
    resolve : { treenipaivat : TreenikalenteriResolver }
  },
  {
    path: 'treenipaivat/kalenteri', 
    component: TreeniKkComponent,
    resolve : { treenipaivat : TreenikalenteriResolver }
  },
  { path: 'treenipaivat/:id/:date', 
    component: TreenipaivaComponent,
    resolve: { treenipaiva : TreenipaivaResolver}
  },
  { 
    path: 'treenipaivat/:id', 
    component: TreenipaivaComponent,
    resolve: { treenipaiva : TreenipaivaResolver}
   },
   { path: 'kayttaja',  
   component: UserDetailComponent
 },
 { 
    path: 'rekisteroityminen',  
    component: RegistrationComponent 
  },
  { 
     path: 'logout',  
     component: LogoutComponent 
   },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: []
})
export class AppRoutingModule {}