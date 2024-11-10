import { Component, OnInit } from '@angular/core';
import { Merma } from '../../../models/merma.model';  // Modelo de Merma
import { MermasService } from '../../../services/mermas.service';  // Servicio para gestionar las mermas
import { take } from 'rxjs/operators';  // Operador para limitar las suscripciones a una sola emisión

@Component({
  selector: 'app-gestionar-mermas',
  templateUrl: './gestionar-mermas.page.html',
  styleUrls: ['./gestionar-mermas.page.scss'],
})
export class GestionarMermasPage implements OnInit {

  // Arreglos para almacenar las mermas según su estado
  mermasPendientes: Merma[] = [];
  mermasAprobadas: Merma[] = [];
  mermasRechazadas: Merma[] = [];

  constructor(private mermasService: MermasService) { }

  ngOnInit() {
    // Cargar las mermas al inicializar la página
    this.cargarMermas();
  }

  // Método para cargar las mermas desde Firebase, separadas por estado
  cargarMermas() {
    // Cargar mermas pendientes
    this.mermasService.getMermasPorEstado('pendiente').pipe(take(1)).subscribe((mermas: Merma[]) => {
      this.mermasPendientes = mermas;  // Asignar las mermas pendientes al arreglo correspondiente
    });

    // Cargar mermas aprobadas
    this.mermasService.getMermasPorEstado('aprobada').pipe(take(1)).subscribe((mermas: Merma[]) => {
      this.mermasAprobadas = mermas;  // Asignar las mermas aprobadas al arreglo correspondiente
    });

    // Cargar mermas rechazadas
    this.mermasService.getMermasPorEstado('rechazada').pipe(take(1)).subscribe((mermas: Merma[]) => {
      this.mermasRechazadas = mermas;  // Asignar las mermas rechazadas al arreglo correspondiente
    });
  }

  // Método para aprobar una merma (cambia su estado a "aprobada")
  aprobarMerma(id: number) {
    // Actualizar el estado de la merma a 'aprobada'
    this.mermasService.actualizarEstadoMerma(id, 'aprobada');
    this.cargarMermas();  // Recargar las mermas para reflejar el cambio
  }

  // Método para rechazar una merma (cambia su estado a "rechazada")
  rechazarMerma(id: number) {
    // Actualizar el estado de la merma a 'rechazada'
    this.mermasService.actualizarEstadoMerma(id, 'rechazada');
    this.cargarMermas();  // Recargar las mermas para reflejar el cambio
  }
}
