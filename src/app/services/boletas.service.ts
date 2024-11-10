import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';  // Servicio de Firestore para gestionar la base de datos en Firebase
import { Boleta } from '../models/boleta.model';  // Modelo de boleta
import { CarritoService } from './carrito.service';  // Servicio del carrito para obtener los productos y el total
import { Observable } from 'rxjs';  // Para gestionar operaciones asíncronas
import { map } from 'rxjs/operators';  // Operador para transformar datos
import firebase from 'firebase/compat/app';  // Firebase para manejar los datos de Firestore

@Injectable({
  providedIn: 'root'
})
export class BoletaService {

  // Inyectamos los servicios necesarios
  constructor(private carritoService: CarritoService, private firestore: AngularFirestore) {}

  // Crear boleta y guardarla en Firestore
  crearBoleta(nombreCliente: string, tipoEnvio: string, rutTrabajador: string): Promise<number> {
    // Obtener los productos y el total desde el carrito
    const productos = this.carritoService.getCarrito();
    const total = this.carritoService.getTotal();

    // Usar la fecha actual para la boleta
    const fecha = new Date(); 

    // Crear una nueva boleta con los datos proporcionados
    const nuevaBoleta: Boleta = {
      nombreCliente,
      tipoEnvio,
      productos,
      total,
      fecha, // Almacenar la fecha como un objeto Date
      id: 0, // ID temporal, se asignará después
      rutTrabajador
    };

    // Obtener el último ID de las boletas existentes y asignar un nuevo ID a la boleta
    return this.firestore.collection<Boleta>('boletas').get().toPromise().then(snapshot => {
      let maxId = 0;

      // Si hay boletas existentes, calcular el ID más alto
      if (snapshot) {
        snapshot.forEach(doc => {
          const data = doc.data() as Boleta;
          if (data.id > maxId) {
            maxId = data.id;
          }
        });
      }

      // Asignar un nuevo ID a la boleta
      nuevaBoleta.id = maxId + 1;

      // Guardar la boleta en Firestore
      return this.firestore.collection('boletas').doc(`${nuevaBoleta.id}`).set(nuevaBoleta).then(() => nuevaBoleta.id);
    });
  }

  // Obtener las boletas filtradas por el RUT del trabajador
  getBoletasPorRut(rutTrabajador: string | null): Observable<Boleta[]> {
    if (!rutTrabajador) {
      // Si el rutTrabajador es nulo, retornar un observable vacío
      return new Observable<Boleta[]>(observer => {
        observer.next([]);  // Retorna un array vacío
        observer.complete();
      });
    }

    // Obtener las boletas cuyo rutTrabajador coincida con el valor dado
    return this.firestore.collection<Boleta>('boletas', ref => ref.where('rutTrabajador', '==', rutTrabajador))
      .snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Boleta;
          const id = data.id;
          // Convertir el timestamp de Firestore a Date si es necesario
          const fecha = data.fecha instanceof firebase.firestore.Timestamp ? data.fecha.toDate() : data.fecha;

          // Retornar la boleta con la fecha como un objeto Date
          return { ...data, id, fecha };
        }))
      );
  }

  // Obtener una boleta específica por su ID
  getBoletaById(id: number): Observable<Boleta | undefined> {
    return this.firestore.collection<Boleta>('boletas').doc(`${id}`).snapshotChanges().pipe(
      map(action => {
        if (action.payload.exists) {
          const data = action.payload.data() as Boleta;
          // Convertir el timestamp de Firestore a Date si es necesario
          const fecha = data.fecha instanceof firebase.firestore.Timestamp ? data.fecha.toDate() : data.fecha;

          // Retornar la boleta con la fecha convertida a Date
          return { ...data, id, fecha };
        }
        return undefined;
      })
    );
  }
}
