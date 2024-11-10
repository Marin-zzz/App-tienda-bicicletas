import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnviarMermaPageRoutingModule } from './enviar-merma-routing.module';

import { EnviarMermaPage } from './enviar-merma.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnviarMermaPageRoutingModule
  ],
  declarations: [EnviarMermaPage]
})
export class EnviarMermaPageModule {}
