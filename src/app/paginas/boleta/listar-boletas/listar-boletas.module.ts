import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ListarBoletasPage } from './listar-boletas.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: ListarBoletasPage }])
  ],
  declarations: [ListarBoletasPage]
})
export class ListarBoletasPageModule {}
