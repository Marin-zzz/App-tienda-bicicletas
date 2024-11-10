import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  // Para redirigir después de agregar el proveedor
import { ProveedoresService } from '../../../services/proveedores.service';  // Servicio de proveedores para interactuar con la base de datos
import { AlertController } from '@ionic/angular';  // Controlador de alertas para mostrar mensajes al usuario
import { Proveedor } from '../../../models/proveedor.model';  // Modelo de proveedor

@Component({
  selector: 'app-agregar-proveedor',
  templateUrl: './agregar-proveedor.page.html',
  styleUrls: ['./agregar-proveedor.page.scss'],
})
export class AgregarProveedorPage implements OnInit {

  // Objeto que representa el nuevo proveedor que se agregará
  nuevoProveedor: Partial<Proveedor> = {
    nombre: '',
    rut: '',
    direccion: '',
    telefono: '',
    correo: '',
    productos: []
  };

  // Lista inicial de productos con un producto vacío
  productos = [
    { nombre: '', precio: 0 }
  ];

  constructor(
    private proveedoresService: ProveedoresService,  // Servicio para agregar proveedores
    private router: Router,  // Servicio para redirigir a otras páginas
    private alertController: AlertController  // Servicio para mostrar alertas
  ) {}

  ngOnInit() {}

  // Agregar un producto adicional a la lista de productos
  agregarProducto() {
    // Solo agregar si el último producto en la lista tiene nombre y precio válidos
    if (this.productos[this.productos.length - 1].nombre && this.productos[this.productos.length - 1].precio !== null) {
      this.productos.push({ nombre: '', precio: 0 });
    }
  }

  // Eliminar un producto de la lista de productos
  eliminarProducto(index: number) {
    // Solo permite eliminar si hay más de un producto en la lista
    if (this.productos.length > 1) {
      this.productos.splice(index, 1);
    }
  }

  // Guardar el proveedor en la base de datos
  async guardarProveedor() {
    // Validar el formulario antes de intentar guardar
    if (this.isFormularioValido()) {
      // Preparar los datos del proveedor
      const proveedorData: Proveedor = {
        ...this.nuevoProveedor,
        productos: this.productos.map(prod => ({
          nombre: prod.nombre ?? 'Producto sin nombre',
          precio: prod.precio ?? 0
        })),
        nombre: this.nuevoProveedor.nombre || 'Sin nombre',
        rut: this.nuevoProveedor.rut || 'Sin RUT',
        direccion: this.nuevoProveedor.direccion || 'Sin dirección',
        telefono: this.nuevoProveedor.telefono || '',
        correo: this.nuevoProveedor.correo || ''
      };

      // Intentar agregar el proveedor
      this.proveedoresService.agregarProveedor(proveedorData)
        .then(async () => {
          // Mostrar mensaje de éxito
          const alert = await this.alertController.create({
            header: 'Éxito',
            message: 'Proveedor agregado correctamente.',
            buttons: ['OK']
          });
          await alert.present();

          // Limpiar los campos del formulario después de guardar
          this.resetFormulario();
        })
        .catch(async (error) => {
          // Mostrar mensaje de error
          const alert = await this.alertController.create({
            header: 'Error',
            message: 'Ocurrió un error al guardar el proveedor.',
            buttons: ['OK']
          });
          await alert.present();
          console.error('Error al guardar el proveedor:', error);
        });
    } else {
      // Si el formulario no es válido, mostrar un mensaje de error
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, complete todos los campos.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  // Validar el formulario antes de guardar
  isFormularioValido(): boolean {
    return this.nuevoProveedor.rut !== '' &&
           this.nuevoProveedor.nombre !== '' &&
           this.nuevoProveedor.direccion !== '' &&
           this.nuevoProveedor.telefono !== '' &&
           this.nuevoProveedor.correo !== '' &&
           this.productos.length > 0 && this.productos.every(p => p.nombre !== '' && p.precio > 0);
  }

  // Método para resetear el formulario después de agregar un proveedor
  resetFormulario() {
    this.nuevoProveedor = {
      nombre: '',
      rut: '',
      direccion: '',
      telefono: '',
      correo: '',
      productos: []
    };
    this.productos = [
      { nombre: '', precio: 0 }  // Reiniciar con un producto vacío
    ];
  }
}
