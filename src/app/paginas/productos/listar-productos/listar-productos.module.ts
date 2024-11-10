import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListarProductosPageRoutingModule } from './listar-productos-routing.module';

import { ListarProductosPage } from './listar-productos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListarProductosPageRoutingModule
  ],
  declarations: [ListarProductosPage]
})
export class ListarProductosPageModule {}
