import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenerarGuiaPageRoutingModule } from './generar-guia-routing.module';

import { GenerarGuiaPage } from './generar-guia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GenerarGuiaPageRoutingModule
  ],
  declarations: [GenerarGuiaPage]
})
export class GenerarGuiaPageModule {}
