import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleGuiaPage } from './detalle-guia.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleGuiaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleGuiaPageRoutingModule {}
