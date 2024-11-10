import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto.model';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'  // Proporcionado a nivel de aplicación
})
export class ProductosService {

  constructor(private firestore: AngularFirestore) {}

  // Obtener todos los productos con stock mayor a 0 desde Firebase
  getProductos(): Observable<Producto[]> {
    return this.firestore.collection<Producto>('productos', ref => ref.where('stock', '>', 0)).valueChanges();
  }

  // Obtener todos los productos, sin importar el stock, desde Firebase
  getTodosLosProductos(): Observable<Producto[]> {
    return this.firestore.collection<Producto>('productos').valueChanges();
  }

  // Obtener un producto por su ID desde Firebase
  getProducto(id: number): Observable<Producto | undefined> {
    return this.firestore.collection<Producto>('productos').doc(id.toString()).valueChanges();
  }

  // Agregar un nuevo producto a Firebase
  agregarProducto(producto: Producto): void {
    // Obtener el siguiente ID y luego agregar el producto a Firebase
    this.obtenerSiguienteId().pipe(take(1)).subscribe(id => {
      producto.id = id;  // Asignar el ID generado al producto

      // Guardar el producto en la colección de productos en Firebase
      this.firestore.collection('productos').doc(id.toString()).set(producto)
        .then(() => {
          console.log('Producto agregado correctamente:', producto);
        })
        .catch(error => {
          console.error('Error al agregar producto:', error);
        });
    });
  }

  // Agregar stock a un producto existente
  agregarStock(id: number, cantidad: number): void {
    // Obtener el producto y actualizar su stock
    this.getProducto(id).pipe(take(1)).subscribe(producto => {
      if (producto) {
        const nuevoStock = producto.stock + cantidad;  // Calcular el nuevo stock
        this.firestore.collection('productos').doc(producto.id.toString()).update({ stock: nuevoStock })
          .then(() => {
            console.log(`Stock actualizado para el producto con ID: ${producto.id}. Nuevo stock: ${nuevoStock}`);
          })
          .catch(error => {
            console.error('Error al actualizar el stock:', error);
          });
      }
    });
  }

  // Reducir stock de un producto
  reducirStock(id: number, cantidad: number): void {
    // Obtener el producto y reducir su stock si es posible
    this.getProducto(id).pipe(take(1)).subscribe(producto => {
      if (producto && producto.stock >= cantidad) {
        const nuevoStock = producto.stock - cantidad;  // Calcular el nuevo stock
        this.firestore.collection('productos').doc(producto.id.toString()).update({ stock: nuevoStock })
          .then(() => {
            console.log(`Stock reducido para el producto con ID: ${producto.id}. Nuevo stock: ${nuevoStock}`);
          })
          .catch(error => {
            console.error('Error al reducir el stock:', error);
          });
      }
    });
  }

  // Obtener el siguiente ID disponible para un nuevo producto
  obtenerSiguienteId(): Observable<number> {
    return this.getTodosLosProductos().pipe(
      take(1),  // Tomar solo la primera emisión
      map(productos => {
        console.log('Productos obtenidos:', productos);  // Mostrar los productos obtenidos en consola
        if (productos.length > 0) {
          const maxId = Math.max(...productos.map(p => p.id));  // Encontrar el mayor ID actual
          console.log('ID máximo encontrado:', maxId);
          return maxId + 1;  // Retornar el siguiente ID
        } else {
          return 1;  // Si no hay productos, el siguiente ID será 1
        }
      })
    );
  }

  // Editar un producto existente en Firebase
  editarProducto(id: number, datosActualizados: Partial<Producto>): void {
    this.firestore.collection('productos').doc(id.toString()).update(datosActualizados)
      .then(() => {
        console.log('Producto actualizado correctamente:', datosActualizados);
      })
      .catch(error => {
        console.error('Error al actualizar producto:', error);
      });
  }

  // Borrar un producto de Firebase
  borrarProducto(id: number): void {
    this.firestore.collection('productos').doc(id.toString()).delete()
      .then(() => {
        console.log('Producto borrado correctamente');
      })
      .catch(error => {
        console.error('Error al borrar producto:', error);
      });
  }
}
