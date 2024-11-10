import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarMermasPage } from './listar-mermas.page';

const routes: Routes = [
  {
    path: '',
    component: ListarMermasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListarMermasPageRoutingModule {}
