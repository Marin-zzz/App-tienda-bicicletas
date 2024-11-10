import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilTrabajadorPageRoutingModule } from './perfil-trabajador-routing.module';

import { PerfilTrabajadorPage } from './perfil-trabajador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilTrabajadorPageRoutingModule
  ],
  declarations: [PerfilTrabajadorPage]
})
export class PerfilTrabajadorPageModule {}
