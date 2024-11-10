import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../services/carrito.service'; 
import { Producto } from '../models/producto.model'; 

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  carrito$ = this.carritoService.carrito$;

  constructor(private carritoService: CarritoService) { }

  ngOnInit() { }

  removeFromCarrito(productId: number) {
    this.carritoService.removeFromCarrito(productId);
  }
}
