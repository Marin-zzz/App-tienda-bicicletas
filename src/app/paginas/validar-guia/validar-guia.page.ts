import { Component } from '@angular/core';
import { GuiasDespachoService } from '../../services/guias-despacho.service';
import { take } from 'rxjs/operators'; 

@Component({
  selector: 'app-validar-guia',
  templateUrl: './validar-guia.page.html',
  styleUrls: ['./validar-guia.page.scss'],
})
export class ValidarGuiaPage {

  // Variable que almacena el número de la guía que se desea validar
  numeroGuia: string = '';

  // Variables para mostrar mensajes de error o éxito al usuario
  mensajeError: string | null = null;
  mensajeExito: string | null = null;

  // Flag que controla si ya se está validando una guía para evitar múltiples envíos
  validando: boolean = false;

  constructor(private guiasDespachoService: GuiasDespachoService) { }

  // Función para recibir la guía de despacho
  recibirGuia() {
    // Si el proceso de validación ya está en curso, salir de la función para evitar envíos múltiples
    if (this.validando) {
      return;
    }

    // Reiniciar los mensajes de error y éxito antes de validar
    this.mensajeError = null;
    this.mensajeExito = null;

    // Verificar si el número de la guía no está vacío
    if (this.numeroGuia) {
      // Iniciar el proceso de validación y marcar la operación como en curso
      this.validando = true;

      // Llamar al servicio para recibir la guía
      this.guiasDespachoService.recibirGuia(this.numeroGuia)
        .pipe(take(1))  // Tomar solo la primera respuesta y desuscribirse automáticamente
        .subscribe(
          (recibida: boolean) => {
            // Si la guía se ha recibido correctamente
            if (recibida) {
              this.mensajeExito = `Guía ${this.numeroGuia} recibida exitosamente.`; // Mostrar mensaje de éxito
            } else {
              // Si la guía no se pudo recibir, mostrar un mensaje de error
              this.mensajeError = `No se pudo recibir la guía. Asegúrese de que está en tránsito y no haya sido recibida antes.`;
            }
            // Restablecer el estado a no validando una vez que el proceso termine
            this.validando = false;
          },
          (error) => {
            // Manejar errores durante el proceso de validación
            this.mensajeError = 'Ocurrió un error al recibir la guía. Inténtelo nuevamente.'; // Mostrar mensaje de error
            console.error('Error al recibir la guía:', error); // Registrar el error en la consola
            // Restablecer el estado a no validando
            this.validando = false;
          }
        );
    } else {
      // Si el número de guía no está ingresado, mostrar un mensaje de error
      this.mensajeError = 'Por favor, ingrese un número de guía válido.';
    }
  }
}
