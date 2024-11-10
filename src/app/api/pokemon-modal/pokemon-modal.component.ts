import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-pokemon-modal',
  templateUrl: './pokemon-modal.component.html',
  styleUrls: ['./pokemon-modal.component.scss'],
})
export class PokemonModalComponent {
  @Input() pokemonList: any[] = [];
  filteredPokemonList: any[] = [];

  constructor(private modalController: ModalController) {
    this.filteredPokemonList = this.pokemonList;
  }

  ngOnInit() {
    this.filteredPokemonList = this.pokemonList;
  }

  // Cerrar el modal y devolver el Pokémon seleccionado
  seleccionarPokemon(pokemon: any) {
    this.modalController.dismiss({ imagen: pokemon.imageUrl });
  }

  // Cerrar el modal sin seleccionar
  cerrarModal() {
    this.modalController.dismiss();
  }

  // Filtrar los Pokémon por nombre
  buscarPokemon(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.filteredPokemonList = this.pokemonList.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchTerm)
    );
  }
}
