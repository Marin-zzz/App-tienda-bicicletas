import { Producto } from './producto.model';

export interface Boleta {
  id: number;
  nombreCliente: string;
  tipoEnvio: string;
  productos: Producto[]; 
  total: number;
  fecha: Date;
  rutTrabajador: string;
}
