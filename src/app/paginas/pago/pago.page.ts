import { Component } from '@angular/core';
import { BoletaService } from '../../services/boletas.service';
import { CarritoService } from '../../services/carrito.service';
import { AlertController, NavController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.page.html',
  styleUrls: ['./pago.page.scss'],
})
export class PagoPage {
  // Variables del formulario
  formaDePago: string = '';
  numeroTarjeta: string = '';
  nombreTitular: string = '';
  fechaExpiracion: string = '';
  codigoSeguridad: string = '';
  opcionEntrega: string = 'envio';
  direccion: string = '';
  telefono: string = '';

  constructor(
    private boletaService: BoletaService,
    private carritoService: CarritoService,
    private alertController: AlertController,
    private navCtrl: NavController,
    private authService: AuthService
  ) {}

  // Formatear número de tarjeta
  formatCardNumber() {
    this.numeroTarjeta = this.numeroTarjeta
      .replace(/\D/g, '') // Elimina cualquier carácter que no sea un número
      .replace(/(.{4})/g, '$1 ') // Añade un espacio cada 4 dígitos
      .trim(); // Elimina cualquier espacio final
  }

  // Formatear fecha de expiración (MM/AA)
  formatExpirationDate() {
    this.fechaExpiracion = this.fechaExpiracion
      .replace(/\D/g, '') // Elimina cualquier carácter que no sea un número
      .replace(/(\d{2})(\d{1,2})/, '$1/$2'); // Añade la barra entre el mes y el año
  }

  // Formatear número de teléfono
  formatPhoneNumber() {
    this.telefono = this.telefono
      .replace(/\D/g, '') // Elimina cualquier carácter que no sea un número
      .substring(0, 9) // Limita la longitud a 9 dígitos
      .replace(/^(9)(\d{4})(\d{4})$/, '$1 $2 $3'); // Formatea el número como "9 1234 5678"
  }
  

  // Mostrar mensaje de error
  async mostrarError(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
  }

  // Mostrar mensaje de confirmación
  async mostrarConfirmacion() {
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: 'El pago ha sido procesado con éxito.',
      buttons: [{
        text: 'OK',
        handler: () => {
          // Navegar a la lista de boletas al hacer clic en OK
          this.navCtrl.navigateRoot('/listar-boletas');
        }
      }],
    });
    await alert.present();
  }
  

  // Resetear el formulario
  resetFormulario() {
    this.numeroTarjeta = '';
    this.nombreTitular = '';
    this.fechaExpiracion = '';
    this.codigoSeguridad = '';
    this.opcionEntrega = 'envio';
    this.direccion = '';
    this.telefono = '';
  }

  // Método para procesar el pago
  async procesarPago() {
    // Validar que todos los campos requeridos estén completos
    if (!this.numeroTarjeta || !this.nombreTitular || !this.fechaExpiracion || !this.codigoSeguridad) {
      await this.mostrarError('Faltan datos para procesar el pago');
      return;
    }

    // Obtener el rut del trabajador logueado
    const trabajadorLogueado = this.authService.getTrabajadorLogueado();
    const rutTrabajador = trabajadorLogueado ? trabajadorLogueado.rut : null;

    if (!rutTrabajador) {
      await this.mostrarError('No se pudo obtener el rut del trabajador logueado');
      return;
    }

    // Crear la boleta
    const nombreCliente = this.nombreTitular; // Usar el nombre del titular de la tarjeta
    const tipoEnvio = this.opcionEntrega; // Usar la opción de entrega seleccionada
    const nuevaBoletaId = await this.boletaService.crearBoleta(nombreCliente, tipoEnvio, rutTrabajador);

    if (nuevaBoletaId) {
      await this.mostrarConfirmacion(); // Mostrar confirmación de pago
      this.carritoService.clearCarrito(); // Limpiar el carrito
      this.resetFormulario(); // Resetear formulario después del pago
    } else {
      await this.mostrarError('Ocurrió un error al procesar el pago. Inténtalo de nuevo.');
    }
  }
}
