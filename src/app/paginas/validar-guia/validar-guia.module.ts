import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ValidarGuiaPageRoutingModule } from './validar-guia-routing.module';

import { ValidarGuiaPage } from './validar-guia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ValidarGuiaPageRoutingModule
  ],
  declarations: [ValidarGuiaPage]
})
export class ValidarGuiaPageModule {}
