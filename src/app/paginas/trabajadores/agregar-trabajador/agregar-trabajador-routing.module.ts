import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarTrabajadorPage } from './agregar-trabajador.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarTrabajadorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarTrabajadorPageRoutingModule {}
