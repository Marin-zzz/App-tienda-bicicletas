import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductosService } from './productos.service';

// Interfaz que representa un ítem dentro de una guía de despacho
export interface GuiaDespachoItem {
  productoId: number; // ID del producto asociado al ítem
  cantidad: number; // Cantidad del producto que se está incluyendo en la guía
  nombreProducto?: string; // Nombre del producto, que puede ser cargado posteriormente
}

// Interfaz que representa una guía de despacho
export interface GuiaDespacho {
  numero: string; // Número de la guía
  fecha: string; // Fecha en que fue generada la guía
  items: GuiaDespachoItem[]; // Lista de ítems que incluye la guía
  estado: 'Transito' | 'Recibida'; // Estado de la guía, puede ser 'Transito' o 'Recibida'
}

@Injectable({
  providedIn: 'root' // Este servicio será proporcionado a toda la aplicación
})
export class GuiasDespachoService {

  constructor(
    private firestore: AngularFirestore, // Servicio de Firestore para interactuar con la base de datos de Firebase
    private productosService: ProductosService // Servicio para interactuar con los productos y gestionar stock
  ) {}

  // Método para obtener todas las guías de despacho almacenadas en Firebase
  getGuias(): Observable<GuiaDespacho[]> {
    return this.firestore.collection<GuiaDespacho>('guias').valueChanges(); // Retorna un observable que emite cualquier cambio en la colección de guías
  }

  // Método para generar el siguiente número de guía basado en las guías existentes en Firebase
  generarNumeroGuia(): Observable<string> {
    return this.getGuias().pipe(
      map(guias => {
        if (!guias || guias.length === 0) {
          return '1';  // Si no hay guías, devolver el número '1'
        }
        const ultimoNumero = Math.max(...guias.map(g => +g.numero)); // Encontrar el mayor número de guía existente
        return (ultimoNumero + 1).toString(); // Retornar el siguiente número
      })
    );
  }

  // Método para agregar una nueva guía a Firebase
  agregarGuia(guia: GuiaDespacho): void {
    // Convertir el número de la guía a número entero para evitar problemas de tipos
    const numeroGuia = Number(guia.numero);

    // Agregar la guía a la colección en Firebase usando el número como ID del documento
    this.firestore.collection('guias').doc(numeroGuia.toString()).set({ ...guia, numero: numeroGuia })
      .then(() => {
        console.log('Guía agregada correctamente a Firebase:', guia); // Mensaje de éxito en la consola
      })
      .catch(error => {
        console.error('Error al agregar guía:', error); // Manejar cualquier error que ocurra al intentar guardar la guía
      });
  }

  // Método para obtener una guía específica por su número
  getGuiaByNumero(numero: string): Observable<GuiaDespacho | undefined> {
    return this.firestore.collection<GuiaDespacho>('guias', ref => ref.where('numero', '==', +numero)) // Filtrar las guías por su número
      .valueChanges()
      .pipe(
        map(guias => guias.length ? guias[0] : undefined) // Si hay guías que coinciden, devolver la primera, si no, undefined
      );
  }

  // Método para recibir una guía y cambiar su estado a 'Recibida'
  recibirGuia(numero: string): Observable<boolean> {
    return this.getGuiaByNumero(numero).pipe(
      map(guia => {
        if (guia && guia.estado === 'Transito') { // Verificar que la guía esté en tránsito antes de cambiar su estado
          // Actualizar el estado de la guía en Firebase
          this.firestore.collection('guias').doc(numero).update({ estado: 'Recibida' });
          // Actualizar el stock de los productos asociados a la guía
          this.actualizarStock(guia.items);
          return true; // Indicar que la guía fue recibida correctamente
        }
        return false; // Si no está en tránsito, devolver false
      })
    );
  }

  // Método privado para actualizar el stock de los productos cuando se recibe una guía
  private actualizarStock(items: GuiaDespachoItem[]): void {
    // Iterar sobre cada ítem en la guía para actualizar el stock del producto asociado
    items.forEach(item => {
      this.productosService.agregarStock(item.productoId, item.cantidad); // Usar el servicio de productos para incrementar el stock
    });
  }
}
