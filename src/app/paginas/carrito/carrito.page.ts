import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';  // Servicio para gestionar el carrito
import { Producto } from '../../models/producto.model';  // Modelo de Producto

@Component({
  selector: 'app-carrito',  // Selector del componente
  templateUrl: './carrito.page.html',  // Ruta del archivo HTML asociado
  styleUrls: ['./carrito.page.scss'],  // Ruta del archivo de estilos
})
export class CarritoPage implements OnInit {
  
  carrito: Producto[] = [];  // Array para almacenar los productos en el carrito
  total: number = 0;  // Variable para almacenar el total del carrito

  constructor(private carritoService: CarritoService) {}  // Inyección del servicio CarritoService

  // Método que se ejecuta al inicializar la página
  ngOnInit() {
    // Suscribirse al Observable del carrito para recibir actualizaciones en tiempo real
    this.carritoService.carrito$.subscribe((productos) => {
      this.carrito = productos;  // Actualizar el array carrito con los productos actuales
      this.updateTotal();  // Actualizar el total cada vez que cambie el carrito
    });
  }

  // Método para eliminar un producto del carrito
  removeFromCarrito(productId: number) {
    this.carritoService.removeFromCarrito(productId);  // Llamar al servicio para eliminar el producto
  }

  // Método para actualizar el total del carrito
  updateTotal() {
    this.total = this.carritoService.getTotal();  // Calcular el total del carrito llamando al servicio
  }
}
