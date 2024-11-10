import { Component } from '@angular/core';
import { Router } from '@angular/router';  // Para redirigir después de un login exitoso
import { AuthService } from '../../../services/auth.service';  // Servicio de autenticación
import { AlertController } from '@ionic/angular';  // Para mostrar alertas al usuario

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  // Variables para almacenar el nombre de usuario y la contraseña ingresados
  usuario: string = '';
  contrasena: string = '';
  mensajeError: string | null = null;  // Para manejar mensajes de error

  constructor(
    private authService: AuthService,  // Inyectar el servicio de autenticación
    private router: Router,  // Inyectar el enrutador para redirigir después del login
    private alertController: AlertController  // Controlador de alertas
  ) {}

  // Método para iniciar sesión
  login() {
    // Convertir el nombre de usuario a minúsculas y eliminar tildes
    this.usuario = this.limpiarTexto(this.usuario.toLowerCase());

    // Llamar al método de login del servicio de autenticación
    this.authService.login(this.usuario, this.contrasena).subscribe(async (exito) => {
      if (exito) {
        this.router.navigate(['/home']);  // Si el login es exitoso, redirigir a la página de inicio
      } else {
        this.mensajeError = 'Usuario o contraseña incorrectos';
        // Mostrar alerta si el login falla
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Usuario o contraseña incorrectos.',
          buttons: ['OK'],
        });
        await alert.present();
      }
    });
  }

  // Función para limpiar el texto de tildes y caracteres especiales
  private limpiarTexto(texto: string): string {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');  // Eliminar tildes
  }
}
