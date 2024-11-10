import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../services/productos.service';
import { Producto } from '../models/producto.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  productos: Producto[] = [];

  constructor(private productosService: ProductosService) { }

  ngOnInit() {
    // Verificación de conexión: obteniendo productos desde Firebase
    this.productosService.getProductos().subscribe((productos: Producto[]) => {
      this.productos = productos;
      console.log('Productos obtenidos:', productos); // Aquí verificamos si los productos se cargan
    });
  }
}
