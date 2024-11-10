import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListarEditarProductosPageRoutingModule } from './listar-editar-productos-routing.module';

import { ListarEditarProductosPage } from './listar-editar-productos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListarEditarProductosPageRoutingModule
  ],
  declarations: [ListarEditarProductosPage]
})
export class ListarEditarProductosPageModule {}
