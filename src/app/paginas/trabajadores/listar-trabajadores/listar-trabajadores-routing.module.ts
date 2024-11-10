import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarTrabajadoresPage } from './listar-trabajadores.page';

const routes: Routes = [
  {
    path: '',
    component: ListarTrabajadoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListarTrabajadoresPageRoutingModule {}
