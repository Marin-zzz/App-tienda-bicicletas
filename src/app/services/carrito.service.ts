import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';  // Importar BehaviorSubject para emitir cambios en el estado del carrito
import { Producto } from '../models/producto.model';  // Importar el modelo de Producto

@Injectable({
  providedIn: 'root'  // Este servicio está disponible en toda la aplicación
})
export class CarritoService {
  private carrito: Producto[] = [];  // Array que almacena los productos en el carrito
  private carritoSubject = new BehaviorSubject<Producto[]>(this.carrito);  // BehaviorSubject para emitir cambios en el carrito

  carrito$ = this.carritoSubject.asObservable();  // Observable para que los componentes se suscriban a los cambios del carrito

  // Vaciar el carrito de compras
  clearCarrito() {
    this.carrito = [];  // Reiniciar el carrito
    this.carritoSubject.next(this.carrito);  // Emitir el estado vacío del carrito
  }

  // Añadir un producto al carrito
  addToCarrito(producto: Producto, cantidad: number) {
    const index = this.carrito.findIndex(p => p.id === producto.id);  // Buscar si el producto ya está en el carrito
    if (index > -1) {
      // Si el producto ya está en el carrito, actualiza el stock (cantidad) en lugar de agregarlo nuevamente
      this.carrito[index].stock += cantidad;
    } else {
      // Si el producto no está en el carrito, agregarlo con la cantidad especificada
      const productoConCantidad = { ...producto, stock: cantidad };  // Crear una copia del producto para no modificar el original
      this.carrito.push(productoConCantidad);
    }
    this.carritoSubject.next(this.carrito);  // Emitir el nuevo estado del carrito
  }

  // Eliminar un producto del carrito por su ID
  removeFromCarrito(productId: number) {
    this.carrito = this.carrito.filter(p => p.id !== productId);  // Filtrar el carrito para eliminar el producto seleccionado
    this.carritoSubject.next(this.carrito);  // Emitir el nuevo estado del carrito sin el producto eliminado
  }

  // Obtener el estado actual del carrito
  getCarrito() {
    return this.carrito;
  }

  // Calcular el total del carrito sumando los precios de los productos y sus cantidades
  getTotal(): number {
    return this.carrito.reduce((sum, item) => sum + item.precio * item.stock, 0);  // Calcular el total multiplicando precio por cantidad
  }
}
