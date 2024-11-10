import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilTrabajadorPage } from './perfil-trabajador.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilTrabajadorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilTrabajadorPageRoutingModule {}
