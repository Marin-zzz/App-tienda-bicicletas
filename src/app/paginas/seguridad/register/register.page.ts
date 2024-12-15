import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';  // Importa tu servicio
import { AlertController, NavController, LoadingController } from '@ionic/angular';  // Importa AlertController, NavController y LoadingController

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,  // Inyecta el servicio para crear usuarios
    private alertController: AlertController,  // Inyecta AlertController
    private navController: NavController,  // Inyecta NavController para navegación
    private loadingController: LoadingController  // Inyecta LoadingController para mostrar la rueda de carga
  ) {
    this.registerForm = this.formBuilder.group({
      rut: ['', Validators.required],
      nombre: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      puesto: ['Cliente'],  // Valor por defecto "Cliente"
      tipo: ['Cliente'],   // Valor por defecto "Cliente"
      usuario: ['', Validators.required],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      imagen: ['assets/images/user.jpg']  // Imagen predeterminada
    });
  }

  ngOnInit() {}

  // Método para registrar el usuario
  async onRegister() {
    if (this.registerForm.valid) {
      const usuarioData = this.registerForm.value;
      
      // Mostrar la rueda de carga
      const loading = await this.loadingController.create({
        message: 'Registrando usuario...',
        spinner: 'crescent',  // Puedes cambiar el tipo de spinner (ej. 'bubbles', 'circles', etc.)
        duration: 2000  // Duración en milisegundos (opcional)
      });
      await loading.present();

      try {
        // Usar el servicio para guardar el usuario en Firebase con el rut como ID
        await this.usuarioService.crearUsuario(usuarioData);

        // Ocultar la rueda de carga después de que el usuario se registre
        await loading.dismiss();

        // Mostrar alerta de éxito
        const alert = await this.alertController.create({
          header: 'Éxito',
          message: 'Usuario registrado con éxito!',
          buttons: [{
            text: 'OK',
            handler: () => {
              // Redirigir a la página "login" o cualquier página que desees
              this.navController.navigateForward('/seguridad/login');  // Aquí cambia '/seguridad/login' por la ruta que desees
            }
          }]
        });
        await alert.present();

        // Limpiar el formulario
        this.registerForm.reset();  // Limpiar el formulario

      } catch (error) {
        console.error('Error al registrar el usuario: ', error);

        // Ocultar la rueda de carga en caso de error
        await loading.dismiss();

        // Mostrar alerta de error
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Hubo un error al registrar el usuario. Intenta nuevamente.',
          buttons: ['OK']
        });
        await alert.present();
      }
    } else {
      console.log('Formulario no válido');
    }
  }
}
