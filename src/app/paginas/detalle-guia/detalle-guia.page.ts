import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GuiasDespachoService, GuiaDespacho } from '../../services/guias-despacho.service';
import { ProductosService } from '../../services/productos.service';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-detalle-guia',
  templateUrl: './detalle-guia.page.html',
  styleUrls: ['./detalle-guia.page.scss'],
})
export class DetalleGuiaPage implements OnInit {

  // Variable que almacenará los detalles de la guía de despacho seleccionada
  guia: GuiaDespacho | undefined;

  constructor(
    private route: ActivatedRoute, // Permite obtener parámetros de la URL
    private guiasDespachoService: GuiasDespachoService, // Servicio para obtener datos de las guías de despacho
    private productosService: ProductosService // Servicio para obtener detalles de productos
  ) { }

  ngOnInit() {
    // Obtener el número de la guía de la URL
    const numeroGuia = this.route.snapshot.paramMap.get('numero');
    
    if (numeroGuia) {
      // Mostrar en la consola el número de la guía obtenida
      console.log('Número de guía obtenido:', numeroGuia);
      
      // Usar el servicio para obtener los detalles de la guía según su número
      this.guiasDespachoService.getGuiaByNumero(numeroGuia).subscribe(guia => {
        this.guia = guia; // Asignar la guía obtenida a la variable `guia`

        if (this.guia) {
          // Mostrar en la consola la guía cargada desde Firebase
          console.log('Guía cargada desde Firebase:', this.guia);

          // Iterar sobre los ítems de la guía para precargar los nombres de los productos asociados
          this.guia.items.forEach(item => {
            // Obtener el producto asociado al `productoId` de cada ítem
            this.productosService.getProducto(item.productoId).subscribe(producto => {
              if (producto) {
                // Asignar el nombre del producto si fue encontrado
                item.nombreProducto = producto.nombre;
                console.log(`Producto cargado para ID ${item.productoId} :`, producto);
              } else {
                // Si no se encuentra el producto, mostrar un mensaje de error
                item.nombreProducto = 'Producto no encontrado';
              }
            });
          });
        }
      });
    }
  }
}
