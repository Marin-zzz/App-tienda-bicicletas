import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';  // Para obtener los parámetros de la URL y redirigir
import { TrabajadoresService } from '../../../services/trabajadores.service';  // Servicio para interactuar con la base de datos de trabajadores
import { Trabajador } from '../../../models/trabajador.model';  // Modelo de trabajador

@Component({
  selector: 'app-editar-trabajador',
  templateUrl: './editar-trabajador.page.html',
  styleUrls: ['./editar-trabajador.page.scss'],
})
export class EditarTrabajadorPage implements OnInit {
  
  // Objeto que contiene la información del trabajador a editar
  trabajador: Trabajador = {
    imagen: '',  // Imagen del trabajador (URL o base64)
    rut: '',  // RUT del trabajador
    nombre: '',  // Nombre del trabajador
    apellidoPaterno: '',  // Apellido paterno del trabajador
    apellidoMaterno: '',  // Apellido materno del trabajador
    correo: '',  // Correo electrónico del trabajador
    puesto: '',  // Puesto del trabajador (ej. Vendedor, Bodeguero)
    tipo: '',  // Tipo de trabajador (ej. Bodega, Ventas)
  };

  constructor(
    private route: ActivatedRoute,  // Para obtener el RUT desde la URL
    private trabajadoresService: TrabajadoresService,  // Servicio para obtener y actualizar trabajadores
    private router: Router  // Para redirigir después de guardar los cambios
  ) {}

  ngOnInit() {
    // Obtener el RUT del trabajador de los parámetros de la URL
    const rut = this.route.snapshot.paramMap.get('rut');
    if (rut) {
      // Obtener el trabajador correspondiente desde Firebase
      this.trabajadoresService.obtenerTrabajadorPorRut(rut).subscribe(trabajadorEncontrado => {
        if (trabajadorEncontrado) {
          // Si el trabajador fue encontrado, asignar los datos
          this.trabajador = trabajadorEncontrado;
        } else {
          console.error('Trabajador no encontrado');
          this.router.navigate(['/listar-trabajadores']);  // Redirigir si no se encuentra el trabajador
        }
      });
    }
  }

  // Método para manejar la selección de una nueva imagen
  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];  // Obtener el archivo seleccionado
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.trabajador.imagen = e.target.result;  // Asignar la imagen cargada al trabajador
      };
      reader.readAsDataURL(file);  // Leer el archivo de imagen como base64
    }
  }

  // Método para guardar los cambios en el trabajador
  guardarCambios() {
    // Actualizar los datos del trabajador en Firebase
    this.trabajadoresService.actualizarTrabajador(this.trabajador)
      .then(() => {
        this.router.navigate(['/listar-trabajadores']);  // Redirigir a la lista de trabajadores después de guardar
      })
      .catch(error => {
        console.error('Error al actualizar trabajador:', error);
      });
  }
}
