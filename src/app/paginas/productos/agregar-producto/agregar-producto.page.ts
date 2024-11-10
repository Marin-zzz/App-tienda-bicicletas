import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductosService } from '../../../services/productos.service';
import { Producto } from '../../../models/producto.model';
import { AlertController } from '@ionic/angular';
import { take } from 'rxjs/operators';  // Importa el operador take para tomar solo la primera emisión

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.page.html',
  styleUrls: ['./agregar-producto.page.scss'],
})
export class AgregarProductoPage implements OnInit {

  // Objeto que representa el nuevo producto a agregar
  nuevoProducto: Producto = {
    id: 0,  // ID se generará al agregar el producto
    nombre: '',
    categoria: 'Bicicletas',  // Categoría por defecto
    precio: 0,
    stock: 0,
    imagen: '',  // Propiedad para almacenar la imagen seleccionada
    descripcion: '' // Nueva propiedad para la descripción del producto
  };

  // Categorías disponibles para el producto
  categorias = ['Bicicletas', 'Partes', 'Accesorios'];

  // Imagen de previsualización que se muestra antes de subir el producto
  imagenPreview: string | ArrayBuffer | null = 'assets/images/placeholder.png';  // Imagen placeholder por defecto

  constructor(
    private productosService: ProductosService,  // Servicio para gestionar productos
    private router: Router,  // Servicio de enrutamiento
    private alertController: AlertController  // Controlador de alertas
  ) { }

  ngOnInit() {
    // Obtener el siguiente ID disponible para el nuevo producto al cargar la página
    this.productosService.obtenerSiguienteId().pipe(take(1)).subscribe(id => {
      this.nuevoProducto.id = id;  // Asignar el nuevo ID generado al producto
      console.log('ID generado en ngOnInit:', id);  // Verificar en consola que se generó el ID
    });
  }

  // Función para manejar el cambio de archivo cuando se selecciona una imagen
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagenPreview = reader.result;  // Mostrar la previsualización de la imagen
        this.nuevoProducto.imagen = reader.result as string;  // Asignar la imagen al producto
      };
      reader.readAsDataURL(file);  // Leer el archivo como URL
    }
  }

  // Función para agregar un producto a la base de datos
  async agregarProducto() {
    // Validar el formulario antes de agregar el producto
    if (this.isFormularioValido()) {
      // Si no se ha seleccionado ninguna imagen, usar la imagen placeholder por defecto
      if (!this.nuevoProducto.imagen) {
        this.nuevoProducto.imagen = 'assets/images/placeholder.png';
      }
  
      // Obtener el siguiente ID y agregar el producto solo una vez
      this.productosService.obtenerSiguienteId().pipe(take(1)).subscribe(id => {
        this.nuevoProducto.id = id;  // Asignar el ID generado al nuevo producto
        console.log('Producto antes de agregar:', this.nuevoProducto);  // Verificar en consola el producto
  
        // Agregar el producto a Firebase
        this.productosService.agregarProducto(this.nuevoProducto);
  
        // Limpiar el formulario después de agregar el producto
        this.resetFormulario();
  
        // Redirigir a la lista de productos
        this.router.navigate(['/listar-productos']);
      });
    } else {
      // Mostrar un mensaje de error si el formulario no es válido
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, complete todos los campos requeridos.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  // Validar que todos los campos del formulario estén correctamente llenados
  isFormularioValido(): boolean {
    return this.nuevoProducto.nombre !== '' &&
           this.nuevoProducto.categoria !== '' &&
           this.nuevoProducto.precio > 0 &&
           this.nuevoProducto.stock >= 0;
  }

  // Resetear el formulario para agregar un nuevo producto
  resetFormulario() {
    // Obtener el siguiente ID disponible y resetear el formulario
    this.productosService.obtenerSiguienteId().pipe(take(1)).subscribe(id => {
      this.nuevoProducto = {
        id: id,  // Asignar el nuevo ID al formulario
        nombre: '',
        categoria: 'Bicicletas',
        precio: 0,
        stock: 0,
        imagen: '',
        descripcion: ''
      };
      this.imagenPreview = 'assets/images/placeholder.png';  // Restaurar la imagen placeholder
    });
  }
}
