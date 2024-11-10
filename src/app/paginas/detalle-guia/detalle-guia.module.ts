import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleGuiaPageRoutingModule } from './detalle-guia-routing.module';

import { DetalleGuiaPage } from './detalle-guia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleGuiaPageRoutingModule
  ],
  declarations: [DetalleGuiaPage]
})
export class DetalleGuiaPageModule {}
