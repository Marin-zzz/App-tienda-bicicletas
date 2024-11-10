// Interfaz que representa un proveedor en el sistema
export interface Proveedor {
  rut: string;  // El RUT es obligatorio y se utiliza como identificador único (ID)
  nombre: string;  // Nombre del proveedor
  direccion?: string;  // Dirección del proveedor (opcional)
  telefono: string;  // Teléfono de contacto del proveedor
  correo: string;  // Correo electrónico de contacto del proveedor
  productos: { nombre: string; precio: number }[];  // Lista de productos que ofrece el proveedor, cada producto tiene un nombre y un precio
}
