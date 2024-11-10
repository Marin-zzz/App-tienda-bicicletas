import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';  // Para acceder a los parámetros de la ruta
import { BoletaService } from 'src/app/services/boletas.service';  // Servicio para obtener los datos de la boleta
import { Boleta } from 'src/app/models/boleta.model';  // Modelo de boleta

@Component({
  selector: 'app-detalle-boleta',  // Selector del componente
  templateUrl: './detalle-boleta.page.html',  // Ruta del archivo HTML asociado
  styleUrls: ['./detalle-boleta.page.scss'],  // Ruta del archivo de estilos (CSS/SCSS) asociado
})
export class DetalleBoletaPage implements OnInit {

  boleta?: Boleta;  // Variable para almacenar la boleta recuperada
  totalProductos: number = 0;  // Inicializar la variable para la cantidad total de productos

  constructor(
    private route: ActivatedRoute,  // Para obtener parámetros de la ruta
    private boletaService: BoletaService  // Servicio de boletas para obtener la boleta
  ) {}

  // Método que se ejecuta al iniciar la página
  ngOnInit() {
    // Obtener el ID de la boleta de los parámetros de la URL
    const id = +this.route.snapshot.queryParamMap.get('id')!;  // Convierte el ID a número
    console.log('ID de boleta recibido:', id);  // Log para verificar el ID recibido

    // Usar el servicio de boletas para obtener la boleta por su ID
    this.boletaService.getBoletaById(id).subscribe(data => {
      this.boleta = data;  // Almacenar los datos de la boleta obtenida
      console.log('Boleta recuperada:', this.boleta);  // Log para verificar que se ha recuperado la boleta

      // Si hay datos de la boleta, calcular el total de productos
      if (data) {
        // Calcular la cantidad total de productos usando el campo 'stock' como cantidad
        this.totalProductos = data.productos.reduce((total, producto) => total + producto.stock, 0);
      }
    });
  }
}
