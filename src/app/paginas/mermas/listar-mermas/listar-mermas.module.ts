import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListarMermasPageRoutingModule } from './listar-mermas-routing.module';

import { ListarMermasPage } from './listar-mermas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListarMermasPageRoutingModule
  ],
  declarations: [ListarMermasPage]
})
export class ListarMermasPageModule {}
