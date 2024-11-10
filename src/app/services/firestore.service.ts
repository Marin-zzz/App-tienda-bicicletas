import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private firestore: AngularFirestore) {}

  // Función de prueba para agregar un producto
  agregarProducto(producto: any) {
    return this.firestore.collection('productos').add(producto);
  }

  // Función de prueba para obtener todos los productos
  obtenerProductos() {
    return this.firestore.collection('productos').snapshotChanges();
  }
}
