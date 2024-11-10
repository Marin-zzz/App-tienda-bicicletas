import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PokemonModalComponent } from './pokemon-modal.component';

@NgModule({
  declarations: [PokemonModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule 
  ],
  exports: [PokemonModalComponent] 
})
export class PokemonModalModule {}
