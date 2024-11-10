import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarEditarProductosPage } from './listar-editar-productos.page';

const routes: Routes = [
  {
    path: '',
    component: ListarEditarProductosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListarEditarProductosPageRoutingModule {}
