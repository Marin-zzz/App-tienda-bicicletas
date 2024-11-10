import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';  // Servicio de Firestore para interactuar con la base de datos en Firebase
import { Trabajador } from '../models/trabajador.model';  // Modelo de trabajador
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'  // Proporcionado a nivel de aplicación
})
export class TrabajadoresService {

  constructor(private firestore: AngularFirestore) {}

  // Obtener todos los trabajadores desde Firebase
  getTrabajadores() {
    return this.firestore.collection<Trabajador>('trabajadores').valueChanges();  // Retorna un observable con la lista de trabajadores
  }

  // Obtener un trabajador por su RUT desde Firebase
  obtenerTrabajadorPorRut(rut: string) {
    return this.firestore.collection<Trabajador>('trabajadores').doc(rut).valueChanges();  // Obtener un trabajador específico por su RUT
  }

  // Agregar un nuevo trabajador a Firebase utilizando su RUT como identificador
  agregarTrabajador(trabajador: Trabajador): Promise<void> {
    // Generar nombre de usuario y contraseña antes de guardar
    trabajador.usuario = this.generarUsuario(trabajador);
    trabajador.contrasena = this.generarContrasena(trabajador.rut);

    // Guardar el trabajador en Firebase
    return this.firestore.collection('trabajadores').doc(trabajador.rut).set(trabajador)
      .then(() => {
        console.log('Trabajador agregado correctamente:', trabajador);
      })
      .catch(error => {
        console.error('Error al agregar trabajador:', error);
        throw error;  // Reenviar el error para manejarlo en el componente
      });
  }

  // Actualizar un trabajador en Firebase
  actualizarTrabajador(trabajador: Trabajador): Promise<void> {
    return this.firestore.collection('trabajadores').doc(trabajador.rut).update(trabajador);
  }

  // Eliminar un trabajador en Firebase
  eliminarTrabajador(rut: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      // Verificar si el trabajador existe antes de eliminarlo
      this.obtenerTrabajadorPorRut(rut).pipe(take(1)).subscribe(trabajador => {
        if (trabajador) {
          this.firestore.collection('trabajadores').doc(rut).delete()
            .then(() => {
              console.log('Trabajador eliminado correctamente');
              resolve();
            })
            .catch(error => {
              console.error('Error al eliminar trabajador:', error);
              reject(error);
            });
        } else {
          console.error('Trabajador no encontrado');
          reject(new Error('Trabajador no encontrado'));
        }
      });
    });
  }

  // Generar nombre de usuario basado en el nombre y los apellidos
  private generarUsuario(trabajador: Trabajador): string {
    const nombreLimpio = this.limpiarTexto(trabajador.nombre);  // Limpiar texto del nombre
    const apellidoPaternoLimpio = this.limpiarTexto(trabajador.apellidoPaterno);  // Limpiar texto del apellido paterno
    const apellidoMaternoLimpio = this.limpiarTexto(trabajador.apellidoMaterno);  // Limpiar texto del apellido materno

    // Crear el nombre de usuario basado en la inicial del nombre y los apellidos
    return `${nombreLimpio.charAt(0)}${apellidoPaternoLimpio}${apellidoMaternoLimpio.charAt(0)}`.toLowerCase();
  }

  // Generar contraseña basada en el RUT
  private generarContrasena(rut: string): string {
    return rut.split('-')[0];  // Generar una contraseña simple usando la parte numérica del RUT
  }

  // Limpiar texto para eliminar caracteres acentuados o especiales
  private limpiarTexto(texto: string): string {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');  // Eliminar acentos y caracteres especiales
  }
}
