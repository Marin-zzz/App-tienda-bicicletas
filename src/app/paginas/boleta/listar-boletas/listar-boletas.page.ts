import { Component, OnInit } from '@angular/core';
import { BoletaService } from '../../../services/boletas.service';  // Servicio de boletas para obtener boletas
import { Boleta } from '../../../models/boleta.model';  // Modelo de boleta
import { Observable } from 'rxjs';  // Para manejar operaciones asíncronas
import { AuthService } from '../../../services/auth.service';  // Servicio de autenticación

@Component({
  selector: 'app-listar-boletas',  // Selector del componente
  templateUrl: './listar-boletas.page.html',  // Ruta del archivo HTML asociado
  styleUrls: ['./listar-boletas.page.scss'],  // Ruta del archivo de estilos
})
export class ListarBoletasPage implements OnInit {
  boletas$: Observable<Boleta[]> | undefined;  // Observable para las boletas obtenidas del servicio

  constructor(
    private boletaService: BoletaService,  // Inyección del servicio de boletas
    private authService: AuthService  // Inyección del servicio de autenticación para obtener el trabajador logueado
  ) {}

  // Método que se ejecuta al inicializar la página
  ngOnInit() {
    const rutTrabajador = this.authService.getRutTrabajador();  // Obtener el RUT del trabajador logueado

    if (rutTrabajador) {  // Si el RUT no es nulo
      this.boletas$ = this.boletaService.getBoletasPorRut(rutTrabajador);  // Obtener las boletas filtradas por el RUT del trabajador
    } else {
      console.error('No hay un trabajador logueado.');  // Manejar el caso donde no hay un trabajador logueado
    }
  }
}
