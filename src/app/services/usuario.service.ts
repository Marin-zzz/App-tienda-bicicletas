import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Trabajador } from '../models/trabajador.model'; // Importa el modelo de Trabajador

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private firestore: AngularFirestore) { }

  // Método para crear un nuevo usuario en Firestore usando el 'rut' como ID del documento
  crearUsuario(usuario: Trabajador) {
    // Usamos el rut como ID del documento en la colección 'trabajadores'
    return this.firestore.collection('trabajadores').doc(usuario.rut).set(usuario);
  }

  // Método para obtener todos los usuarios
  obtenerUsuarios() {
    return this.firestore.collection('trabajadores').snapshotChanges();
  }

  // Método para obtener un usuario por su RUT
  obtenerUsuarioPorRut(rut: string) {
    return this.firestore.collection('trabajadores', ref => ref.where('rut', '==', rut)).snapshotChanges();
  }
}

