import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../../services/productos.service';  // Servicio de productos para interactuar con la base de datos
import { Producto } from '../../../models/producto.model';  // Modelo de producto

@Component({
  selector: 'app-listar-editar-productos',
  templateUrl: './listar-editar-productos.page.html',
  styleUrls: ['./listar-editar-productos.page.scss'],
})
export class ListarEditarProductosPage implements OnInit {

  // Arreglo que contiene todos los productos
  productos: Producto[] = [];

  // Arreglo que contiene los productos filtrados según el término de búsqueda
  productosFiltrados: Producto[] = [];

  // Variable que almacena el término de búsqueda introducido por el usuario
  terminoBusqueda: string = ''; 

  constructor(private productosService: ProductosService) { }

  ngOnInit() {
    // Al inicializar, obtener todos los productos y suscribirse al observable
    this.productosService.getTodosLosProductos().subscribe(productos => {
      this.productos = productos;  // Asignar todos los productos obtenidos
      this.productosFiltrados = [...this.productos];  // Inicializar los productos filtrados con todos los productos
    });
  }

  // Función que filtra los productos según el término de búsqueda
  filtrarProductos() {
    const termino = this.terminoBusqueda.toLowerCase();  // Convertir el término a minúsculas para búsqueda no sensible a mayúsculas/minúsculas

    // Filtrar productos que contengan el término de búsqueda en el nombre o el ID
    this.productosFiltrados = this.productos.filter(producto =>
      producto.nombre.toLowerCase().includes(termino) ||  // Buscar por nombre del producto
      producto.id.toString().includes(termino)  // Buscar por ID del producto
    );
  }
}
