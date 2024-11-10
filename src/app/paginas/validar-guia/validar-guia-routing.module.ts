import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ValidarGuiaPage } from './validar-guia.page';

const routes: Routes = [
  {
    path: '',
    component: ValidarGuiaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ValidarGuiaPageRoutingModule {}
