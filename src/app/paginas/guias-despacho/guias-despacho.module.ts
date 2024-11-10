import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GuiasDespachoPageRoutingModule } from './guias-despacho-routing.module';

import { GuiasDespachoPage } from './guias-despacho.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GuiasDespachoPageRoutingModule
  ],
  declarations: [GuiasDespachoPage]
})
export class GuiasDespachoPageModule {}
