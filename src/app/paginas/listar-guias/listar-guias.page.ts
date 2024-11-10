import { Component, OnInit } from '@angular/core';
import { GuiasDespachoService, GuiaDespacho } from '../../services/guias-despacho.service';

@Component({
  selector: 'app-listar-guias',
  templateUrl: './listar-guias.page.html',
  styleUrls: ['./listar-guias.page.scss'],
})
export class ListarGuiasPage implements OnInit {

  // Arreglo que almacenará todas las guías de despacho cargadas
  guias: GuiaDespacho[] = [];

  constructor(private guiasDespachoService: GuiasDespachoService) { }

  ngOnInit() {
    // Al inicializar el componente, cargar las guías de despacho
    this.cargarGuias();
  }

  // Método para cargar todas las guías desde el servicio
  cargarGuias() {
    // Suscribirse al observable para obtener las guías desde Firebase
    this.guiasDespachoService.getGuias().subscribe(guias => {
      this.guias = guias; // Asignar las guías obtenidas al arreglo `guias`
    });
  }
}
