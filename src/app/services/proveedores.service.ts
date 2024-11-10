import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';  // Servicio de Firestore para interactuar con la base de datos en Firebase
import { Observable } from 'rxjs';
import { Proveedor } from '../models/proveedor.model';  // Modelo de proveedor
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'  // Proporcionado a nivel de aplicación
})
export class ProveedoresService {

  constructor(private firestore: AngularFirestore) {}

  // Obtener todos los proveedores desde Firebase
  getProveedores(): Observable<Proveedor[]> {
    return this.firestore.collection<Proveedor>('proveedores').valueChanges();  // Retorna un observable con los proveedores
  }

  // Obtener un proveedor por su RUT desde Firebase
  getProveedor(rut: string): Observable<Proveedor | undefined> {
    return this.firestore.collection<Proveedor>('proveedores').doc(rut).valueChanges();  // Obtener el proveedor por su RUT
  }

  // Agregar un nuevo proveedor a Firebase utilizando el RUT como identificador único
  agregarProveedor(proveedor: Proveedor): Promise<void> {
    return this.firestore.collection('proveedores').doc(proveedor.rut).set(proveedor);  // Guardar el proveedor en Firebase
  }

  // Actualizar los datos de un proveedor existente utilizando su RUT
  actualizarProveedor(proveedor: Proveedor): Promise<void> {
    return this.firestore.collection('proveedores').doc(proveedor.rut).update(proveedor)
      .then(() => console.log('Proveedor actualizado correctamente:', proveedor))
      .catch(error => console.error('Error al actualizar proveedor:', error));
  }

  // Eliminar un proveedor de Firebase por su RUT
  eliminarProveedor(rut: string): Promise<void> {
    return this.firestore.collection('proveedores').doc(rut).delete()
      .then(() => console.log('Proveedor eliminado correctamente'))
      .catch(error => console.error('Error al eliminar proveedor:', error));
  }
}
