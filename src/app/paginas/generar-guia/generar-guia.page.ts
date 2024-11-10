import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GuiasDespachoService, GuiaDespacho, GuiaDespachoItem } from '../../services/guias-despacho.service';
import { ProductosService } from '../../services/productos.service';
import { Producto } from '../../models/producto.model';
import { AlertController } from '@ionic/angular';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-generar-guia',
  templateUrl: './generar-guia.page.html',
  styleUrls: ['./generar-guia.page.scss'],
})
export class GenerarGuiaPage implements OnInit {

  // Arreglo que contendrá los productos disponibles
  productos: Producto[] = [];

  // Objeto que representa la guía de despacho actual
  guia: GuiaDespacho = {
    numero: '', // Número de la guía
    fecha: new Date().toISOString(), // Fecha actual como fecha de la guía
    items: [], // Arreglo que contendrá los productos seleccionados en la guía
    estado: 'Transito' // Estado inicial de la guía
  };

  // Número estimado de guía, generado automáticamente
  numeroEstimadoGuia: string = '';

  // Variables para gestionar la selección de productos y cantidades
  productoSeleccionado: Producto | null = null;
  cantidadSeleccionada: number | null = null;

  // Variable que controla la visibilidad del formulario para agregar productos
  mostrarFormularioProducto: boolean = false;

  constructor(
    private productosService: ProductosService, // Servicio para obtener los productos
    private guiasDespachoService: GuiasDespachoService, // Servicio para gestionar las guías de despacho
    private router: Router, // Router para navegar entre páginas
    private alertController: AlertController // Controlador para mostrar alertas
  ) {}

  ngOnInit() {
    // Al inicializar el componente, obtener los productos disponibles
    this.productosService.getTodosLosProductos().pipe(take(1)).subscribe(productos => {
      this.productos = productos; // Asignar los productos obtenidos al arreglo
    });
  }

  ionViewWillEnter() {
    // Al entrar en la vista, generar un número de guía estimado
    this.guiasDespachoService.generarNumeroGuia().pipe(take(1)).subscribe(numero => {
      this.numeroEstimadoGuia = numero; // Asignar el número de guía generado
    });
  }

  // Mostrar el formulario para agregar productos a la guía
  mostrarFormulario() {
    this.mostrarFormularioProducto = true;
  }

  // Función para agregar un producto seleccionado a la guía de despacho
  onAgregarItem() {
    // Verificar si se ha seleccionado un producto y una cantidad válida
    if (this.productoSeleccionado && this.cantidadSeleccionada && this.cantidadSeleccionada > 0) {
      // Crear un objeto que representa un ítem en la guía de despacho
      const item: GuiaDespachoItem = { 
        productoId: this.productoSeleccionado.id, // ID del producto seleccionado
        cantidad: this.cantidadSeleccionada // Cantidad seleccionada
      };
      // Agregar el ítem a la lista de ítems de la guía
      this.guia.items.push(item);
      // Limpiar la selección del producto y cantidad
      this.productoSeleccionado = null;
      this.cantidadSeleccionada = null;
      // Ocultar el formulario de selección de productos
      this.mostrarFormularioProducto = false;
    }
  }

  // Función para obtener el nombre de un producto basado en su ID
  obtenerNombreProducto(productoId: number): string {
    const producto = this.productos.find(p => p.id === productoId); // Buscar el producto por ID
    return producto ? producto.nombre : 'Producto no encontrado'; // Devolver el nombre del producto o mensaje de error
  }

  // Función para procesar la guía de despacho
  async procesarGuia() {
    // Verificar si no hay productos agregados a la guía
    if (this.guia.items.length === 0) {
      // Mostrar alerta si no se han agregado productos
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'No se puede procesar la guía sin productos. Por favor, añada al menos un producto.',
        buttons: ['OK']
      });
      await alert.present();
      return; // Detener la función si no hay productos
    }

    // Generar el número de la guía y procesarla
    this.guiasDespachoService.generarNumeroGuia().pipe(take(1)).subscribe(numero => {
      this.guia.numero = numero; // Asignar el número generado a la guía
      this.guiasDespachoService.agregarGuia(this.guia); // Agregar la guía al sistema (Firebase)
      this.router.navigate(['/listar-guias']); // Redirigir a la lista de guías
      this.resetearGuia(); // Resetear el formulario de la guía
    });
  }

  // Función para resetear la guía de despacho
  resetearGuia() {
    // Resetear el objeto de la guía y su estado
    this.guia = {
      numero: '', // Vaciar el número de la guía
      fecha: new Date().toISOString(), // Asignar la fecha actual
      items: [], // Vaciar los ítems seleccionados
      estado: 'Transito' // Resetear el estado a 'Transito'
    };
    
    // Volver a generar un número estimado de guía
    this.guiasDespachoService.generarNumeroGuia().pipe(take(1)).subscribe(numero => {
      this.numeroEstimadoGuia = numero; // Asignar el nuevo número estimado
    });
  }
}
