import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';  // Para obtener los parámetros de la URL
import { ProductosService } from '../../../services/productos.service';  // Servicio de productos para interactuar con la base de datos
import { CarritoService } from '../../../services/carrito.service';  // Servicio del carrito de compras
import { Producto } from '../../../models/producto.model';  // Modelo de producto
import { Observable } from 'rxjs';

@Component({
  selector: 'app-detalles-producto',
  templateUrl: './detalles-producto.page.html',
  styleUrls: ['./detalles-producto.page.scss'],
})
export class DetallesProductoPage implements OnInit {

  // Observable que contiene el producto a mostrar en los detalles
  producto$: Observable<Producto | undefined> | undefined; 

  constructor(
    private route: ActivatedRoute,  // Para obtener el ID del producto desde la URL
    private productosService: ProductosService,  // Servicio de productos para obtener los datos del producto
    private carritoService: CarritoService  // Servicio para agregar productos al carrito de compras
  ) { }

  ngOnInit() {
    // Obtener el ID del producto de los parámetros de la URL
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // Obtener el producto desde el servicio de productos usando el ID
    this.producto$ = this.productosService.getProducto(id); 
  }

  // Función para agregar el producto al carrito de compras
  addToCarrito(producto: Producto) {
    if (producto) {
      // Llamar al servicio para agregar el producto al carrito con una cantidad de 1
      this.carritoService.addToCarrito(producto, 1);
    }
  }
}
