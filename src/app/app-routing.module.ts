import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InsuranceFormComponent } from './components/insurance-form/insurance-form.component';
import { InsuranceListComponent } from './components/insurance-list/insurance-list.component';

const routes: Routes = [
  {
    path:'', pathMatch: 'full', redirectTo: 'create'
  },
  {
    path: 'create',
    component: InsuranceFormComponent
  },
  {
    path: 'list',
    component: InsuranceListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
