import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  // Servicio para redirigir después de agregar el trabajador
import { TrabajadoresService } from '../../../services/trabajadores.service';  // Servicio para interactuar con la base de datos de trabajadores
import { Trabajador } from '../../../models/trabajador.model';  // Modelo de trabajador
import { AlertController } from '@ionic/angular';  // Controlador de alertas para mostrar mensajes al usuario

@Component({
  selector: 'app-agregar-trabajador',
  templateUrl: './agregar-trabajador.page.html',
  styleUrls: ['./agregar-trabajador.page.scss'],
})
export class AgregarTrabajadorPage implements OnInit {

  // Objeto que representa el nuevo trabajador a agregar
  nuevoTrabajador: Trabajador = {
    rut: '',
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    correo: '',
    puesto: '',
    tipo: 'Cliente',  // Tipo por defecto
    imagen: 'assets/images/placeholder.png'  // Imagen por defecto
  };

  // Lista de tipos de trabajador disponibles
  tipos = ['Cliente', 'Bodega', 'Ventas', 'Supervisor Bodega', 'Equipo Productos', 'Recursos Humanos'];

  // Previsualización de la imagen del trabajador antes de ser guardada
  imagenPreview: string | ArrayBuffer | null = 'assets/images/placeholder.png';

  constructor(
    private trabajadoresService: TrabajadoresService,  // Servicio para agregar el trabajador
    private router: Router,  // Servicio para redirigir a otra página
    private alertController: AlertController  // Servicio para mostrar alertas al usuario
  ) { }

  ngOnInit() {}

  // Método para agregar el trabajador
  async agregarTrabajador() {
    // Validar el formulario antes de intentar agregar el trabajador
    if (this.isFormularioValido()) {
      if (!this.nuevoTrabajador.imagen) {
        this.nuevoTrabajador.imagen = 'assets/images/placeholder.png';  // Usar imagen por defecto si no se selecciona ninguna
      }

      // Agregar el trabajador utilizando el servicio de trabajadores
      this.trabajadoresService.agregarTrabajador(this.nuevoTrabajador).then(async () => {
        await this.mostrarAlerta('Éxito', 'Trabajador agregado correctamente.');
        this.resetFormulario();  // Resetear el formulario después de agregar el trabajador
        this.router.navigate(['/listar-trabajadores']);  // Redirigir a la lista de trabajadores
      }).catch(async (error) => {
        await this.mostrarAlerta('Error', 'Hubo un error al agregar el trabajador: ' + error.message);
      });

    } else {
      await this.mostrarAlerta('Error', 'Por favor, complete todos los campos requeridos.');
    }
  }

  // Método para validar el formulario
  isFormularioValido(): boolean {
    return this.nuevoTrabajador.rut !== '' &&
           this.nuevoTrabajador.nombre !== '' &&
           this.nuevoTrabajador.apellidoPaterno !== '' &&
           this.nuevoTrabajador.apellidoMaterno !== '' &&
           this.nuevoTrabajador.puesto !== '' &&
           this.nuevoTrabajador.tipo !== '';
  }

  // Método para resetear el formulario
  resetFormulario() {
    this.nuevoTrabajador = {
      rut: '',
      nombre: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      correo: '',
      puesto: '',
      tipo: 'Ventas',  // Restablecer el tipo por defecto
      imagen: 'assets/images/placeholder.png'  // Restablecer la imagen por defecto
    };
    this.imagenPreview = 'assets/images/placeholder.png';  // Restablecer la previsualización de la imagen
  }

  // Método para manejar la selección de imagen
  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagenPreview = e.target.result;  // Mostrar la imagen seleccionada
        this.nuevoTrabajador.imagen = this.imagenPreview as string;  // Asignar la imagen al trabajador
      };
      reader.readAsDataURL(file);  // Leer el archivo de imagen
    }
  }

  // Método para mostrar alertas
  private async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
