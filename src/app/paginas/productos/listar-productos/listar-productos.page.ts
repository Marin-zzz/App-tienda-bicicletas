import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../../services/productos.service';  // Servicio de productos para interactuar con la base de datos
import { Producto } from '../../../models/producto.model';  // Modelo de producto

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.page.html',
  styleUrls: ['./listar-productos.page.scss'],
})
export class ListarProductosPage implements OnInit {

  // Arreglo que almacena los productos obtenidos desde el servicio
  productos: Producto[] = [];

  // Flag que indica si se deben mostrar todos los productos o solo los que tienen stock
  mostrarTodos: boolean = false;

  constructor(private productosService: ProductosService) { }

  ngOnInit() {
    // Al inicializar el componente, filtrar productos según el estado de `mostrarTodos`
    this.filtrarProductos();
  }

  // Función que filtra los productos, mostrando todos o solo los que tienen stock según el flag `mostrarTodos`
  filtrarProductos() {
    if (this.mostrarTodos) {
      // Si `mostrarTodos` es verdadero, obtener todos los productos (sin importar el stock)
      this.productosService.getTodosLosProductos().subscribe(productos => {
        console.log('Productos obtenidos:', productos);  // Mostrar los productos en la consola para verificar
        this.productos = productos;  // Asignar los productos obtenidos al arreglo
      });
    } else {
      // Si `mostrarTodos` es falso, obtener solo los productos que tienen stock mayor a 0
      this.productosService.getProductos().subscribe(productos => {
        console.log('Productos filtrados (con stock):', productos);  // Mostrar productos con stock en la consola para verificar
        this.productos = productos;  // Asignar los productos filtrados al arreglo
      });
    }
  }

  // Función que alterna el filtro de mostrar todos los productos o solo los que tienen stock
  alternarFiltro() {
    this.mostrarTodos = !this.mostrarTodos;  // Cambiar el estado de `mostrarTodos`
    this.filtrarProductos();  // Volver a filtrar productos según el nuevo estado de `mostrarTodos`
  }
}
