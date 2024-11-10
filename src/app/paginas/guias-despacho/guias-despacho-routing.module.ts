import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuiasDespachoPage } from './guias-despacho.page';

const routes: Routes = [
  {
    path: '',
    component: GuiasDespachoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuiasDespachoPageRoutingModule {}
