import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';  // Importa el controlador de alertas de Ionic

@Component({
  selector: 'app-register',  // Selector del componente
  templateUrl: './register.page.html',  // Ruta del archivo HTML asociado a este componente
  styleUrls: ['./register.page.scss'],  // Ruta del archivo de estilos (CSS/SCSS) asociado a este componente
})
export class RegisterPage implements OnInit {

  // Inyecta el AlertController para mostrar alertas
  constructor(private alertController: AlertController) { }

  ngOnInit() {}

  // Método para mostrar una alerta cuando el registro es exitoso
  async mostrarAlerta() {
    const alert = await this.alertController.create({
      header: 'Registro Exitoso',  // Título de la alerta
      message: 'Usuario creado.',  // Mensaje que aparece en la alerta
      buttons: ['OK']  // Botón de cierre de la alerta
    });

    // Muestra la alerta
    await alert.present();
  }
}
