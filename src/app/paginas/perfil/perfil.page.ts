import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';  // Servicio de autenticación para obtener el trabajador logueado
import { TrabajadoresService } from '../../services/trabajadores.service';  // Servicio para gestionar la información del trabajador
import { Trabajador } from '../../models/trabajador.model';  // Modelo de trabajador
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  // Módulos para gestionar formularios y validaciones
import { AlertController, ModalController } from '@ionic/angular';  // Servicios para mostrar alertas y modales
import { HttpClient } from '@angular/common/http';  // Servicio para realizar solicitudes HTTP
import { PokemonModalComponent } from 'src/app/api/pokemon-modal/pokemon-modal.component';  // Componente modal para seleccionar un Pokémon

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  
  // Formulario reactivo para gestionar los datos del trabajador
  trabajadorForm: FormGroup;

  // Lista para almacenar los Pokémon obtenidos de la API
  pokemonList: any[] = [];

  constructor(
    private authService: AuthService,  // Servicio de autenticación para obtener los datos del trabajador logueado
    private trabajadoresService: TrabajadoresService,  // Servicio para actualizar la información del trabajador
    private formBuilder: FormBuilder,  // FormBuilder para crear el formulario reactivo
    private alertController: AlertController,  // Servicio para mostrar alertas
    private modalController: ModalController,  // Servicio para gestionar modales
    private http: HttpClient  // Servicio HTTP para obtener los datos de la API de Pokémon
  ) {
    // Inicialización del formulario reactivo
    this.trabajadorForm = this.formBuilder.group({
      rut: [{ value: '', disabled: true }],  // Campo RUT deshabilitado
      nombre: ['', Validators.required],  // Campo obligatorio
      apellidoPaterno: ['', Validators.required],  // Campo obligatorio
      apellidoMaterno: ['', Validators.required],  // Campo obligatorio
      correo: ['', Validators.required],  // Campo obligatorio
      tipo: [{ value: '', disabled: true }],  // Campo tipo deshabilitado
      imagen: ['']  // Campo para la imagen del trabajador
    });
  }

  ngOnInit() {
    // Cargar los datos del trabajador logueado
    this.cargarDatosTrabajador();
    // Cargar la lista de Pokémon
    this.cargarPokemon();
  }

  // Cargar los datos del trabajador desde el servicio de autenticación
  async cargarDatosTrabajador() {
    const trabajadorLogueado = this.authService.getTrabajadorLogueado();  // Obtener el trabajador logueado
    if (trabajadorLogueado) {
      this.trabajadorForm.patchValue(trabajadorLogueado);  // Asignar los datos al formulario
    }
  }

  // Cargar la lista de Pokémon desde la API
  async cargarPokemon() {
    this.http.get('https://pokeapi.co/api/v2/pokemon?limit=150').subscribe((response: any) => {
      // Transformar los resultados para incluir las URLs de las imágenes de cada Pokémon
      this.pokemonList = response.results.map((pokemon: any) => {
        const pokemonId = pokemon.url.split('/').filter(Boolean).pop();  // Obtener el ID del Pokémon desde la URL
        return {
          name: pokemon.name,  // Nombre del Pokémon
          url: pokemon.url,  // URL del Pokémon
          imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`  // URL de la imagen
        };
      });
    });
  }

  // Abrir el modal para seleccionar un Pokémon
  async abrirModalPokemon() {
    const modal = await this.modalController.create({
      component: PokemonModalComponent,  // Componente del modal
      componentProps: { pokemonList: this.pokemonList }  // Pasar la lista de Pokémon al modal
    });

    await modal.present();

    // Obtener el Pokémon seleccionado cuando se cierre el modal
    const { data } = await modal.onWillDismiss();
    if (data) {
      // Asignar la imagen seleccionada al formulario
      this.trabajadorForm.patchValue({
        imagen: data.imagen
      });
    }
  }

  // Guardar los cambios en el perfil del trabajador
  async guardarPerfil() {
    // Validar que todos los campos obligatorios del formulario estén completos
    if (this.trabajadorForm.invalid) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor complete todos los campos requeridos.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    // Crear un objeto Trabajador con los datos actualizados
    const trabajadorActualizado: Trabajador = {
      ...this.authService.getTrabajadorLogueado(),  // Obtener los datos actuales del trabajador logueado
      ...this.trabajadorForm.getRawValue()  // Actualizar con los valores del formulario
    };

    // Actualizar el trabajador en Firebase y en el servicio de autenticación
    this.trabajadoresService.actualizarTrabajador(trabajadorActualizado);
    this.authService.actualizarTrabajador(trabajadorActualizado);

    // Mostrar mensaje de éxito
    const alert = await this.alertController.create({
      header: 'Guardado',
      message: 'Cambios realizados con éxito.',
      buttons: ['OK']
    });
    await alert.present();

    // Recargar los datos actualizados del trabajador
    this.cargarDatosTrabajador();
  }

  // Manejar la carga de una nueva imagen
  handleFileInput(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.trabajadorForm.patchValue({
          imagen: e.target.result  // Asignar la imagen cargada al formulario
        });
      };
      reader.readAsDataURL(file);  // Leer el archivo como base64
    }
  }
}
