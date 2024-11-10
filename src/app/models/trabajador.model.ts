// Interfaz que representa un trabajador en el sistema
export interface Trabajador {
  imagen: string;  // URL o ruta de la imagen del trabajador
  rut: string;  // RUT del trabajador, utilizado como identificador único
  nombre: string;  // Nombre del trabajador
  apellidoPaterno: string;  // Apellido paterno del trabajador
  apellidoMaterno: string;  // Apellido materno del trabajador
  correo: string;  // Correo electrónico del trabajador
  puesto: string;  // Descripción del puesto del trabajador (ej. Vendedor, Bodeguero)
  tipo: 'Bodega' | 'Ventas' | 'Supervisor Bodega' | 'Equipo Productos' | 'Recursos Humanos' | 'Admin' | 'Cliente' | '';  // Tipo de trabajador, con varias opciones predefinidas
  usuario?: string;  // Nombre de usuario para el sistema, opcional
  contrasena?: string;  // Contraseña para el sistema, opcional
}
