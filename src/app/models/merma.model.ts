// Modelo para representar una merma en el sistema
export class Merma {
  id: number;  // Identificador único de la merma
  idProducto: number;  // ID del producto asociado a la merma
  cantidad: number;  // Cantidad de productos que se están declarando como merma
  justificacion: string;  // Justificación o motivo de la merma
  estado: 'pendiente' | 'aprobada' | 'rechazada';  // Estado de la merma, puede ser pendiente, aprobada o rechazada

  constructor(
    id: number = 0,
    idProducto: number = 0,
    cantidad: number = 0,
    justificacion: string = '',
    estado: 'pendiente' | 'aprobada' | 'rechazada' = 'pendiente'  // Estado por defecto es 'pendiente'
  ) {
    this.id = id;
    this.idProducto = idProducto;
    this.cantidad = cantidad;
    this.justificacion = justificacion;
    this.estado = estado;
  }
}
