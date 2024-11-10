import { Component, OnInit } from '@angular/core';
import { Merma } from '../../../models/merma.model';  // Modelo de merma
import { MermasService } from '../../../services/mermas.service';  // Servicio para gestionar mermas

@Component({
  selector: 'app-listar-mermas',
  templateUrl: './listar-mermas.page.html',
  styleUrls: ['./listar-mermas.page.scss'],
})
export class ListarMermasPage implements OnInit {

  // Arreglo para almacenar todas las mermas cargadas desde Firebase
  mermas: Merma[] = [];

  constructor(private mermasService: MermasService) { }

  ngOnInit() {
    // Cargar las mermas cuando la página se inicializa
    this.cargarMermas();
  }

  // Método para cargar todas las mermas desde Firebase
  cargarMermas() {
    // Suscribirse al observable para obtener las mermas
    this.mermasService.getMermas().subscribe({
      // Manejo de éxito al cargar las mermas
      next: (mermas: Merma[]) => {
        if (mermas.length > 0) {
          this.mermas = mermas;  // Asignar las mermas cargadas al arreglo
          console.log('Mermas cargadas:', this.mermas);
        } else {
          console.log('No hay mermas disponibles.');  // Mostrar mensaje si no hay mermas
        }
      },
      // Manejo de error al intentar cargar las mermas
      error: (error) => {
        console.error('Error al cargar las mermas:', error);
      }
    });
  }
}
