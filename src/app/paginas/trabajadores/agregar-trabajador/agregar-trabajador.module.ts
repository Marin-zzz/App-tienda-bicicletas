import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarTrabajadorPageRoutingModule } from './agregar-trabajador-routing.module';

import { AgregarTrabajadorPage } from './agregar-trabajador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarTrabajadorPageRoutingModule
  ],
  declarations: [AgregarTrabajadorPage]
})
export class AgregarTrabajadorPageModule {}
