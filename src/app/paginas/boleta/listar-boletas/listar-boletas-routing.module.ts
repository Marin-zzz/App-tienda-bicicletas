import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarBoletasPage } from './listar-boletas.page';

const routes: Routes = [
  {
    path: '',
    component: ListarBoletasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListarBoletasPageRoutingModule {}
