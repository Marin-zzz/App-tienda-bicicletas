import { Component, OnInit } from '@angular/core';
import { GuiasDespachoService, GuiaDespacho } from '../../services/guias-despacho.service';

@Component({
  selector: 'app-guias-despacho',
  templateUrl: './guias-despacho.page.html',
  styleUrls: ['./guias-despacho.page.scss'],
})
export class GuiasDespachoPage implements OnInit {

  guias: GuiaDespacho[] = [];

  constructor(private guiasDespachoService: GuiasDespachoService) { }

  ngOnInit() {
    // Suscríbete al Observable para obtener las guías
    this.guiasDespachoService.getGuias().subscribe((guias: GuiaDespacho[]) => {
      this.guias = guias;  // Asigna los datos obtenidos desde el Observable
    });
  }
}
