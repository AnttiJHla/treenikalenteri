import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserDetailComponent }   from './user-detail.component';
import { TreenipaivatComponent }      from './treenipaivat.component';
import { TreenipaivaComponent }      from './treenipaiva.component';
import { TreeniKkComponent }      from './treeni-kk/treeni-kk.component';

const routes: Routes = [
  { path: '', redirectTo: '/kayttaja', pathMatch: 'full' },
  { path: 'kayttaja',  component: UserDetailComponent },
  { path: 'treenipaivat',  component: TreenipaivatComponent },
  { path: 'treenipaivat/:id', component: TreenipaivaComponent },
  { path: 'treenikk',  component: TreeniKkComponent },

  { path: 'rekisteroityminen',  component: UserDetailComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}