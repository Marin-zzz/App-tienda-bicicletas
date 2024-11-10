import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';  // Importa el controlador de alertas de Ionic

@Component({
  selector: 'app-password-reset',  // Selector del componente
  templateUrl: './password-reset.page.html',  // Ruta del archivo HTML asociado
  styleUrls: ['./password-reset.page.scss'],  // Ruta del archivo de estilos
})
export class PasswordResetPage implements OnInit {

  // Inyecta el AlertController para manejar las alertas
  constructor(private alertController: AlertController) { }

  ngOnInit() {}

  // Método para mostrar una alerta de confirmación de cambio de contraseña
  async mostrarAlerta() {
    const alert = await this.alertController.create({
      header: 'Cambio de Contraseña',  // Título de la alerta
      message: 'Se enviará un correo para confirmar el cambio de la contraseña.',  // Mensaje de la alerta
      buttons: ['OK']  // Botón de la alerta
    });

    // Muestra la alerta
    await alert.present();
  }

}
