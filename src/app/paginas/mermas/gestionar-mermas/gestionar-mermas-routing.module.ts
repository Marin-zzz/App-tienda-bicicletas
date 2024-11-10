import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestionarMermasPage } from './gestionar-mermas.page';

const routes: Routes = [
  {
    path: '',
    component: GestionarMermasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionarMermasPageRoutingModule {}
