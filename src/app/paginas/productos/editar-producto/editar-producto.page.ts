import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';  // Para obtener parámetros de la URL y redirigir
import { ProductosService } from '../../../services/productos.service';  // Servicio de productos para interactuar con la base de datos
import { Producto } from '../../../models/producto.model';  // Modelo de producto
import { AlertController } from '@ionic/angular';  // Controlador de alertas para mostrar confirmaciones

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.page.html',
  styleUrls: ['./editar-producto.page.scss'],
})
export class EditarProductoPage implements OnInit {

  // Producto que se está editando
  producto: Producto | undefined;

  // Categorías disponibles para el producto
  categorias = ['Bicicletas', 'Partes', 'Accesorios'];

  // Imagen de previsualización que se muestra antes de guardar cambios
  imagenPreview: string | ArrayBuffer | null = 'assets/images/placeholder.png';

  constructor(
    private route: ActivatedRoute,  // Para obtener el ID del producto desde la URL
    private productosService: ProductosService,  // Servicio de productos para cargar y editar productos
    private router: Router,  // Para redirigir después de guardar o borrar el producto
    private alertController: AlertController  // Para mostrar alertas y confirmaciones
  ) { }

  ngOnInit() {
    // Obtener el ID del producto de los parámetros de la URL
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);

    // Cargar el producto desde el servicio de productos
    this.productosService.getProducto(id).subscribe((producto) => {
      this.producto = producto;  // Asignar el producto cargado
      if (this.producto?.imagen) {
        this.imagenPreview = this.producto.imagen;  // Mostrar la imagen del producto si existe
      }
    });
  }

  // Función para manejar el cambio de imagen cuando se selecciona un archivo
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagenPreview = reader.result;  // Mostrar la previsualización de la imagen
        if (this.producto) {
          this.producto.imagen = reader.result as string;  // Asignar la imagen al producto
        }
      };
      reader.readAsDataURL(file);  // Leer el archivo como URL
    }
  }

  // Función para guardar los cambios realizados en el producto
  guardarCambios() {
    if (this.producto) {
      // Guardar el producto con los cambios a través del servicio de productos
      this.productosService.editarProducto(this.producto.id, this.producto);

      // Redirigir a la página de listado de productos
      this.router.navigate(['/listar-editar-productos']);
    }
  }

  // Función para borrar el producto solo si tiene stock 0
  async borrarProducto() {
    if (this.producto && this.producto.stock === 0) {  // Solo permite borrar si el stock es 0
      // Mostrar una alerta para confirmar la eliminación del producto
      const alert = await this.alertController.create({
        header: 'Confirmar',
        message: '¿Estás seguro de que quieres borrar este producto?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',  // Opción de cancelar la acción
          },
          {
            text: 'Borrar',
            handler: () => {
              // Borrar el producto a través del servicio y redirigir al listado de productos
              this.productosService.borrarProducto(this.producto!.id);
              this.router.navigate(['/listar-editar-productos']);
            },
          },
        ],
      });
      await alert.present();  // Mostrar la alerta
    }
  }
}
