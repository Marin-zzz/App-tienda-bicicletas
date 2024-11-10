import { Injectable } from '@angular/core';
import { TrabajadoresService } from './trabajadores.service';  // Servicio para obtener trabajadores desde Firebase
import { Trabajador } from '../models/trabajador.model';  // Modelo de trabajador
import { Observable } from 'rxjs';  // Para gestionar la lógica asincrónica

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  // Variable para almacenar el trabajador que ha iniciado sesión
  private trabajadorLogueado: Trabajador | null = null;

  constructor(private trabajadoresService: TrabajadoresService) {}

  // Método para manejar el login, recibe usuario y contraseña
  login(usuario: string, contrasena: string): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      // Obtener todos los trabajadores y buscar una coincidencia con el usuario y la contraseña
      this.trabajadoresService.getTrabajadores().subscribe(trabajadores => {
        const trabajador = trabajadores.find(t => 
          t.usuario === usuario && t.contrasena === contrasena  // Comparar usuario y contraseña
        );
        if (trabajador) {
          this.trabajadorLogueado = trabajador;  // Almacenar el trabajador logueado si coincide
          observer.next(true);  // Login exitoso
        } else {
          observer.next(false);  // Fallo de login
        }
        observer.complete();
      });
    });
  }  

  // Método para cerrar la sesión
  logout() {
    this.trabajadorLogueado = null;  // Eliminar el trabajador logueado
  }

  // Obtener el trabajador que está logueado
  getTrabajadorLogueado(): Trabajador | null {
    return this.trabajadorLogueado;
  }

  // Obtener el tipo de trabajador que está logueado (por ejemplo, Admin, Bodega, etc.)
  getTipoTrabajadorLogueado(): string | null {
    return this.trabajadorLogueado ? this.trabajadorLogueado.tipo : null;
  }

  // Verificar si un trabajador está autenticado
  isAuthenticated(): boolean {
    return this.trabajadorLogueado !== null;  // Retorna true si hay un trabajador logueado
  }

  // Obtener el RUT del trabajador logueado
  getRutTrabajador(): string | null {
    return this.trabajadorLogueado ? this.trabajadorLogueado.rut : null;
  }

  // Actualizar los datos del trabajador logueado
  actualizarTrabajador(trabajador: Trabajador) {
    if (this.trabajadorLogueado) {
      // Combinar los datos del trabajador logueado con los nuevos datos proporcionados
      this.trabajadorLogueado = { ...this.trabajadorLogueado, ...trabajador };
    }
  }
}
