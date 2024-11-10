import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';  // Firestore para gestionar la base de datos en Firebase
import { Observable } from 'rxjs';
import { Merma } from '../models/merma.model';  // Modelo de merma
import { ProductosService } from './productos.service';  // Servicio para gestionar productos
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MermasService {

  constructor(private firestore: AngularFirestore, private productosService: ProductosService) {}

  // Obtener todas las mermas desde Firebase
  getMermas(): Observable<Merma[]> {
    return this.firestore.collection<Merma>('mermas').valueChanges();
  }

  // Obtener mermas filtradas por estado (pendiente, aprobada o rechazada)
  getMermasPorEstado(estado: 'pendiente' | 'aprobada' | 'rechazada'): Observable<Merma[]> {
    return this.firestore.collection<Merma>('mermas', ref => ref.where('estado', '==', estado)).valueChanges();
  }

  // Agregar una nueva merma a Firebase
  agregarMerma(merma: Merma): void {
    // Obtener el siguiente ID disponible para asignarlo a la nueva merma
    this.obtenerSiguienteId().pipe(take(1)).subscribe(id => {
      merma.id = id;  // Asignar el nuevo ID a la merma
      this.firestore.collection('mermas').doc(id.toString()).set(merma)
        .then(() => {
          console.log('Merma agregada correctamente a Firebase:', merma);
        })
        .catch(error => {
          console.error('Error al agregar merma:', error);
        });
    });
  }

  // Obtener el siguiente ID disponible para las mermas
  obtenerSiguienteId(): Observable<number> {
    return this.getMermas().pipe(
      take(1),
      map(mermas => {
        if (mermas.length > 0) {
          return Math.max(...mermas.map(m => m.id)) + 1;  // Retornar el ID máximo + 1
        } else {
          return 1;  // Si no hay mermas, empezar con ID 1
        }
      })
    );
  }

  // Actualizar el estado de una merma (pendiente, aprobada o rechazada)
  actualizarEstadoMerma(id: number, nuevoEstado: 'pendiente' | 'aprobada' | 'rechazada'): void {
    this.firestore.collection('mermas').doc(id.toString()).update({ estado: nuevoEstado })
      .then(() => {
        console.log(`Merma ${id} actualizada a estado ${nuevoEstado}`);
        
        // Si la merma es aprobada, reducir el stock del producto
        if (nuevoEstado === 'aprobada') {
          this.getMermaById(id).pipe(take(1)).subscribe(merma => {
            if (merma) {
              this.productosService.reducirStock(merma.idProducto, merma.cantidad);  // Reducir stock
            }
          });
        }
      })
      .catch(error => {
        console.error('Error al actualizar el estado de la merma:', error);
      });
  }

  // Obtener una merma por su ID desde Firebase
  getMermaById(id: number): Observable<Merma | undefined> {
    return this.firestore.collection<Merma>('mermas').doc(id.toString()).valueChanges();
  }
}
