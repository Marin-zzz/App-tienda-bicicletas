import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListarTrabajadoresPageRoutingModule } from './listar-trabajadores-routing.module';

import { ListarTrabajadoresPage } from './listar-trabajadores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListarTrabajadoresPageRoutingModule
  ],
  declarations: [ListarTrabajadoresPage]
})
export class ListarTrabajadoresPageModule {}
