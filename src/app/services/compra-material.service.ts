import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';  // Importar Firestore para la base de datos de Firebase
import { Observable } from 'rxjs';  // Importar Observable para manejar operaciones asíncronas
import { Proveedor } from '../models/proveedor.model';  // Importar el modelo de Proveedor
import { take } from 'rxjs/operators';  // Operador de RxJS para controlar las suscripciones

@Injectable({
  providedIn: 'root'  // Servicio disponible en toda la aplicación
})
export class CompraMaterialService {

  // Inyección de dependencias
  constructor(private firestore: AngularFirestore) {}

  // Obtener todos los proveedores desde Firebase como un Observable
  getProveedores(): Observable<Proveedor[]> {
    return this.firestore.collection<Proveedor>('proveedores').valueChanges();
  }

  // Guardar una nueva compra en Firebase
  agregarCompra(compra: any): Promise<void> {
    const id = this.firestore.createId();  // Generar un ID único para la compra
    // Guardar la compra en la colección 'compras-material' con el ID generado
    return this.firestore.collection('compras-material').doc(id).set({ ...compra, id });
  }
}
