import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserDetailComponent }   from './user-detail.component';
import { TreenipaivatComponent }      from './treenipaivat.component';
import { TreenipaivaComponent }      from './treenipaiva.component';
import { TreeniKkComponent }      from './treeni-kk/treeni-kk.component';
import { CreateTreenipaivaComponent } from "./treenipaiva/create-treenipaiva.component";

const routes: Routes = [
  { path: '', redirectTo: '/treenipaivat', pathMatch: 'full' },
  { path: 'kayttaja',  component: UserDetailComponent },
  { path: 'treenipaivat',  component: TreenipaivatComponent },
  //{ path: 'treenipaivat/new', component: CreateTreenipaivaComponent },
  //{ path: 'treenipaivat/new/:date', component: CreateTreenipaivaComponent },
  { path: 'treenipaivat/:id/:date', component: TreenipaivaComponent },
  { path: 'treenipaivat/:id', component: TreenipaivaComponent },
  { path: 'treenikk',  component: TreeniKkComponent },

  { path: 'rekisteroityminen',  component: UserDetailComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}