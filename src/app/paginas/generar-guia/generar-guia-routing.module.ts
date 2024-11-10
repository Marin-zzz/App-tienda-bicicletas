import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GenerarGuiaPage } from './generar-guia.page';

const routes: Routes = [
  {
    path: '',
    component: GenerarGuiaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GenerarGuiaPageRoutingModule {}
