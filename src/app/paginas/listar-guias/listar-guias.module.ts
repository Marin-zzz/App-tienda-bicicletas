import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListarGuiasPageRoutingModule } from './listar-guias-routing.module';

import { ListarGuiasPage } from './listar-guias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListarGuiasPageRoutingModule
  ],
  declarations: [ListarGuiasPage]
})
export class ListarGuiasPageModule {}
