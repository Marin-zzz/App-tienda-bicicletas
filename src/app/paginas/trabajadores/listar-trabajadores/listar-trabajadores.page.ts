import { Component, OnInit } from '@angular/core';
import { TrabajadoresService } from '../../../services/trabajadores.service';  // Servicio para interactuar con la base de datos de trabajadores
import { Trabajador } from '../../../models/trabajador.model';  // Modelo de trabajador
import { Router } from '@angular/router';  // Servicio para redirigir a otras páginas
import { AlertController } from '@ionic/angular';  // Controlador de alertas para mostrar confirmaciones
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-listar-trabajadores',
  templateUrl: './listar-trabajadores.page.html',
  styleUrls: ['./listar-trabajadores.page.scss'],
})
export class ListarTrabajadoresPage implements OnInit {

  // Arreglo que almacena todos los trabajadores obtenidos desde Firebase
  trabajadores: Trabajador[] = [];

  // Arreglo que almacena los trabajadores filtrados para búsqueda
  trabajadoresFiltrados: Trabajador[] = [];

  // Término de búsqueda introducido por el usuario
  searchTerm: string = '';

  constructor(
    private trabajadoresService: TrabajadoresService,  // Servicio para obtener y gestionar trabajadores
    private router: Router,  // Servicio para redirigir a otras páginas
    private alertController: AlertController  // Servicio para mostrar alertas
  ) { }

  ngOnInit() {
    // Al iniciar, cargar la lista de trabajadores desde Firebase
    this.cargarTrabajadores();
  }

  // Método para cargar los trabajadores desde Firebase
  cargarTrabajadores() {
    this.trabajadoresService.getTrabajadores().subscribe((trabajadores: Trabajador[]) => {
      this.trabajadores = trabajadores;  // Asignar los trabajadores obtenidos a la lista completa
      this.trabajadoresFiltrados = [...this.trabajadores];  // Iniciar la lista filtrada con todos los trabajadores
    });
  }

  // Filtrar la lista de trabajadores basado en el término de búsqueda
  filtrarTrabajadores() {
    const term = this.searchTerm.toLowerCase();  // Convertir el término de búsqueda a minúsculas
    this.trabajadoresFiltrados = this.trabajadores.filter(trabajador =>
      trabajador.nombre.toLowerCase().includes(term) ||  // Filtrar por nombre
      trabajador.apellidoPaterno.toLowerCase().includes(term) ||  // Filtrar por apellido paterno
      trabajador.apellidoMaterno.toLowerCase().includes(term) ||  // Filtrar por apellido materno
      trabajador.rut.includes(term)  // Filtrar por RUT
    );
  }

  // Navegar a la página de detalles del trabajador
  verDetalles(trabajador: Trabajador) {
    this.router.navigate(['/perfil-trabajador', trabajador.rut]);  // Redirigir a la página de perfil del trabajador
  }

  // Navegar a la página de edición del trabajador
  editarTrabajador(trabajador: Trabajador) {
    this.router.navigate(['/editar-trabajador', trabajador.rut]);  // Redirigir a la página de edición del trabajador
  }

  // Eliminar un trabajador con confirmación
  async eliminarTrabajador(trabajador: Trabajador) {
    // Mostrar una alerta de confirmación antes de eliminar
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: `¿Estás seguro de que deseas eliminar a ${trabajador.nombre}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',  // Opción para cancelar la eliminación
        },
        {
          text: 'Eliminar',
          handler: () => {
            // Si el usuario confirma, eliminar el trabajador y recargar la lista
            this.trabajadoresService.eliminarTrabajador(trabajador.rut)
              .then(() => this.cargarTrabajadores())  // Recargar la lista tras eliminar
              .catch(error => console.error('Error al eliminar trabajador:', error));
          },
        },
      ],
    });

    await alert.present();  // Mostrar la alerta
  }
}
