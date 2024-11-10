import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';  // Para obtener el RUT desde la URL
import { TrabajadoresService } from '../../../services/trabajadores.service';  // Servicio para interactuar con la base de datos de trabajadores
import { Trabajador } from '../../../models/trabajador.model';  // Modelo de trabajador

@Component({
  selector: 'app-perfil-trabajador',
  templateUrl: './perfil-trabajador.page.html',
  styleUrls: ['./perfil-trabajador.page.scss'],
})
export class PerfilTrabajadorPage implements OnInit {

  // Objeto que contiene los detalles del trabajador a mostrar
  trabajador: Trabajador | undefined;

  constructor(
    private route: ActivatedRoute,  // Para obtener parámetros de la URL
    private trabajadoresService: TrabajadoresService  // Servicio para obtener los datos del trabajador
  ) { }

  ngOnInit() {
    // Obtener el RUT del trabajador desde la URL
    const rut = this.route.snapshot.paramMap.get('rut');
    
    if (rut) {
      // Obtener el trabajador correspondiente al RUT desde Firebase
      this.trabajadoresService.obtenerTrabajadorPorRut(rut).subscribe((trabajador) => {
        this.trabajador = trabajador;  // Asignar el trabajador obtenido a la propiedad `trabajador`
      });
    }
  }
}
