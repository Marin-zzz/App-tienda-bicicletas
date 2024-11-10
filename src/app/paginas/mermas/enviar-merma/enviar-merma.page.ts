import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  // Para redirigir después de enviar la merma
import { MermasService } from '../../../services/mermas.service';  // Servicio para gestionar las mermas
import { ProductosService } from '../../../services/productos.service';  // Servicio para gestionar productos
import { Producto } from '../../../models/producto.model';  // Modelo de producto
import { Merma } from '../../../models/merma.model';  // Modelo de merma
import { AlertController } from '@ionic/angular';  // Para mostrar alertas si hay errores

@Component({
  selector: 'app-enviar-merma',
  templateUrl: './enviar-merma.page.html',
  styleUrls: ['./enviar-merma.page.scss'],
})
export class EnviarMermaPage implements OnInit {
  
  // Datos del producto y merma que se están creando
  idProducto: number = 0;
  nombreProducto: string = '';
  cantidad: number = 0;
  justificacion: string = '';
  productos: Producto[] = [];  // Lista de productos disponibles
  stockDisponible: number = 0;  // Stock disponible del producto seleccionado
  idMermaCreada: number | null = null;  // ID de la merma creada (si es necesario)

  constructor(
    private mermasService: MermasService,  // Servicio para gestionar la merma
    private productosService: ProductosService,  // Servicio para obtener productos
    private router: Router,  // Para redirigir después de enviar la merma
    private alertController: AlertController  // Para mostrar alertas
  ) {}

  ngOnInit() {
    // Obtener todos los productos disponibles para seleccionar en la merma
    this.productosService.getTodosLosProductos().subscribe(productos => {
      this.productos = productos;
    });
  }

  // Cambiar la información del producto seleccionado y obtener su stock
  onProductoChange() {
    const selectedProducto = this.productos.find(p => p.id === this.idProducto);  // Buscar el producto seleccionado
    if (selectedProducto) {
      this.nombreProducto = selectedProducto.nombre;  // Asignar el nombre del producto seleccionado
      this.stockDisponible = selectedProducto.stock;  // Asignar el stock disponible del producto seleccionado
    }
  }

  // Método para mostrar alertas de error
  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  // Validar y enviar una nueva merma
  async enviarMerma() {
    // Validar que la cantidad sea positiva y no exceda el stock disponible
    if (this.cantidad <= 0) {
      await this.mostrarAlerta('La cantidad ingresada debe ser mayor a 0.');
      return;
    }

    if (this.cantidad > this.stockDisponible) {
      await this.mostrarAlerta(`La cantidad ingresada no puede ser mayor al stock disponible (${this.stockDisponible}).`);
      return;
    }

    // Crear una nueva merma con los datos del formulario
    const nuevaMerma: Merma = {
      id: 0,  // El ID se asignará automáticamente en el servicio
      idProducto: this.idProducto,
      cantidad: this.cantidad,
      justificacion: this.justificacion,
      estado: 'pendiente'  // El estado inicial de la merma es 'pendiente'
    };

    // Llamar al servicio para agregar la nueva merma
    this.mermasService.agregarMerma(nuevaMerma);

    // Redirigir al home después de enviar la merma
    this.router.navigate(['/home']);
  }
}
