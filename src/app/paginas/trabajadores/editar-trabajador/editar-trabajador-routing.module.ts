import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarTrabajadorPage } from './editar-trabajador.page';

const routes: Routes = [
  {
    path: '',
    component: EditarTrabajadorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarTrabajadorPageRoutingModule {}
