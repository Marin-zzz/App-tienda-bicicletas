import { Component, OnInit } from '@angular/core';
import { ProveedoresService } from '../../../services/proveedores.service';  // Servicio para obtener los proveedores
import { Proveedor } from '../../../models/proveedor.model';  // Modelo de Proveedor
import { CompraMaterialService } from '../../../services/compra-material.service';  // Servicio para gestionar las compras
import { ChangeDetectorRef } from '@angular/core';  // Servicio para detectar cambios manualmente
import { GiphyService } from '../../../services/giphy.service';  // Servicio para obtener GIFs de Giphy

@Component({
  selector: 'app-comprar-material',  // Selector del componente
  templateUrl: './comprar-material.page.html',  // Ruta del archivo HTML asociado
  styleUrls: ['./comprar-material.page.scss'],  // Ruta del archivo de estilos
})
export class ComprarMaterialPage implements OnInit {

  proveedores: Proveedor[] = [];  // Lista de proveedores cargados desde Firebase
  proveedorSeleccionado: Proveedor | null = null;  // Proveedor seleccionado por el usuario
  productosSeleccionados: any[] = [];  // Lista de productos seleccionados para la compra
  cantidadSeleccionada: number[] = [];  // Lista de cantidades seleccionadas por cada producto
  totalCompra: number = 0;  // Total acumulado de la compra
  gifUrl: string | null = null;  // URL del GIF a mostrar al finalizar la compra

  // Inyección de dependencias
  constructor(
    private proveedoresService: ProveedoresService,
    private compraMaterialService: CompraMaterialService,
    private giphyService: GiphyService,  // Servicio para buscar GIFs
    private cdr: ChangeDetectorRef  // Servicio para detectar cambios en la interfaz
  ) {}

  // Se ejecuta cuando se carga la página
  ngOnInit() {
    // Obtener los proveedores desde el servicio
    this.proveedoresService.getProveedores().subscribe(proveedores => {
      this.proveedores = proveedores;
    });
  }

  // Formatear un valor numérico como moneda chilena (CLP)
  formatCLP(value: number): string {
    return value.toLocaleString('es-CL', { minimumFractionDigits: 0 });
  }

  // Resetear el formulario de compra
  resetFormulario() {
    this.productosSeleccionados = [];  // Limpiar la lista de productos seleccionados
    this.cantidadSeleccionada = [];  // Limpiar la lista de cantidades seleccionadas
    this.totalCompra = 0;  // Reiniciar el total
    this.gifUrl = null;  // Limpiar el GIF mostrado
  }

  // Evento que se ejecuta cuando se selecciona un proveedor
  onProveedorSeleccionado() {
    if (this.proveedorSeleccionado) {
      this.resetFormulario();  // Reiniciar el formulario si se cambia de proveedor
      this.cdr.detectChanges();  // Detectar los cambios manualmente
    }
  }

  // Agregar un nuevo producto a la lista de productos seleccionados
  agregarProducto() {
    this.productosSeleccionados.push({ nombre: '', precio: 0, total: 0 });
    this.cantidadSeleccionada.push(1);  // Inicializar la cantidad del producto en 1
  }

  // Eliminar un producto de la lista de productos seleccionados
  eliminarProducto(index: number) {
    if (this.productosSeleccionados.length > 0) {
      this.productosSeleccionados.splice(index, 1);  // Eliminar el producto de la lista
      this.cantidadSeleccionada.splice(index, 1);  // Eliminar la cantidad correspondiente
      this.calcularTotalCompra();  // Recalcular el total de la compra
    }
  }

  // Actualizar el total de un producto basado en su cantidad
  actualizarTotal(index: number) {
    const cantidad = this.cantidadSeleccionada[index];
    const producto = this.productosSeleccionados[index];
    if (producto && cantidad > 0) {
      producto.total = producto.precio * cantidad;  // Calcular el total del producto
      this.calcularTotalCompra();  // Recalcular el total de la compra
    }
  }

  // Calcular el total de la compra sumando los totales de cada producto
  calcularTotalCompra() {
    this.totalCompra = this.productosSeleccionados.reduce((sum, prod) => sum + (prod.total || 0), 0);
    this.cdr.detectChanges();  // Detectar cambios en la vista
  }

  // Realizar la compra y mostrar el GIF de congratulaciones
  realizarCompra() {
    if (this.proveedorSeleccionado && this.productosSeleccionados.length > 0) {
      const compra = {
        proveedorRut: this.proveedorSeleccionado.rut || '',
        proveedorNombre: this.proveedorSeleccionado.nombre || '',
        productos: this.productosSeleccionados.map((producto, index) => ({
          nombre: producto.nombre,
          cantidad: this.cantidadSeleccionada[index],
          precio: producto.precio,
          total: producto.total
        })),
        totalCompra: this.totalCompra,
        fecha: new Date().toISOString()  // Fecha actual de la compra
      };

      // Guardar la compra en Firebase usando el servicio
      this.compraMaterialService.agregarCompra(compra)
        .then(() => {
          console.log('Compra realizada con éxito:', compra);
          this.resetFormulario();  // Limpiar el formulario después de la compra
          // Obtener el GIF de congratulaciones desde Giphy
          this.obtenerGif();
        })
        .catch(error => {
          console.error('Error al guardar la compra:', error);
        });
    } else {
      console.log('Debe seleccionar al menos un producto para realizar la compra');
    }
  }

  // Obtener un GIF de congratulaciones desde Giphy
  obtenerGif() {
    this.giphyService.buscarGifDeCongratulations().then(response => {
      if (response.data.length > 0) {
        this.gifUrl = response.data[0].images.original.url;  // Asignar la URL del GIF obtenido
        this.cdr.detectChanges();  // Actualizar la vista para mostrar el GIF
      }
    }).catch(error => {
      console.error('Error al obtener el GIF:', error);
    });
  }

  // Seleccionar un producto y actualizar los detalles del mismo
  onProductoSeleccionado(index: number, productoSeleccionado: any) {
    if (productoSeleccionado) {
      this.productosSeleccionados[index] = {
        nombre: productoSeleccionado.nombre,
        precio: productoSeleccionado.precio,
        total: productoSeleccionado.precio * this.cantidadSeleccionada[index],
      };
      this.actualizarTotal(index);  // Actualizar el total del producto seleccionado
    }
  }

  // Evento que se ejecuta cuando cambia la cantidad de un producto
  onCantidadCambiada(index: number) {
    this.actualizarTotal(index);  // Recalcular el total del producto al cambiar la cantidad
  }
}
