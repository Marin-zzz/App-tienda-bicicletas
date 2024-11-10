import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'listar-productos',
    loadChildren: () => import('./paginas/productos/listar-productos/listar-productos.module').then(m => m.ListarProductosPageModule)
  },
  {
    path: 'agregar-producto',
    loadChildren: () => import('./paginas/productos/agregar-producto/agregar-producto.module').then(m => m.AgregarProductoPageModule)
  },
  {
    path: 'editar-producto/:id',
    loadChildren: () => import('./paginas/productos/editar-producto/editar-producto.module').then(m => m.EditarProductoPageModule)
  },
  {
    path: 'listar-trabajadores',
    loadChildren: () => import('./paginas/trabajadores/listar-trabajadores/listar-trabajadores.module').then(m => m.ListarTrabajadoresPageModule)
  },
  {
    path: 'agregar-trabajador',
    loadChildren: () => import('./paginas/trabajadores/agregar-trabajador/agregar-trabajador.module').then(m => m.AgregarTrabajadorPageModule)
  },
  {
    path: 'perfil-trabajador/:rut',
    loadChildren: () => import('./paginas/trabajadores/perfil-trabajador/perfil-trabajador.module').then(m => m.PerfilTrabajadorPageModule)
  },
  {
    path: 'seguridad/login',
    loadChildren: () => import('./paginas/seguridad/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'seguridad/register',
    loadChildren: () => import('./paginas/seguridad/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'seguridad/password-reset',
    loadChildren: () => import('./paginas/seguridad/password-reset/password-reset.module').then(m => m.PasswordResetPageModule)
  },
  {
    path: 'guias-despacho',
    loadChildren: () => import('./paginas/guias-despacho/guias-despacho.module').then(m => m.GuiasDespachoPageModule)
  },
  {
    path: 'generar-guia',
    loadChildren: () => import('./paginas/generar-guia/generar-guia.module').then(m => m.GenerarGuiaPageModule)
  },
  {
    path: 'listar-guias',
    loadChildren: () => import('./paginas/listar-guias/listar-guias.module').then(m => m.ListarGuiasPageModule)
  },
  {
    path: 'detalle-guia/:numero',
    loadChildren: () => import('./paginas/detalle-guia/detalle-guia.module').then(m => m.DetalleGuiaPageModule)
  },
  {
    path: 'validar-guia',
    loadChildren: () => import('./paginas/validar-guia/validar-guia.module').then(m => m.ValidarGuiaPageModule)
  },
  {
    path: 'detalles-producto/:id',
    loadChildren: () => import('./paginas/productos/detalles-producto/detalles-producto.module').then(m => m.DetallesProductoPageModule)
  },
  {
    path: 'listar-editar-productos',
    loadChildren: () => import('./paginas/productos/listar-editar-productos/listar-editar-productos.module').then(m => m.ListarEditarProductosPageModule)
  },
  {
    path: 'gestionar-mermas',  // Ruta para la página de gestionar mermas
    loadChildren: () => import('./paginas/mermas/gestionar-mermas/gestionar-mermas.module').then(m => m.GestionarMermasPageModule)
  },
  {
    path: 'enviar-merma',  // Ruta para la página de enviar mermas
    loadChildren: () => import('./paginas/mermas/enviar-merma/enviar-merma.module').then(m => m.EnviarMermaPageModule)
  },
  {
    path: 'listar-mermas',
    loadChildren: () => import('./paginas/mermas/listar-mermas/listar-mermas.module').then(m => m.ListarMermasPageModule)
  },
  {
    path: 'carrito',
    loadChildren: () => import('./paginas/carrito/carrito.module').then( m => m.CarritoPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./paginas/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'pago',
    loadChildren: () => import('./paginas/pago/pago.module').then( m => m.PagoPageModule)
  },
  {
    path: 'listar-boletas',
    loadChildren: () => import('./paginas/boleta/listar-boletas/listar-boletas.module').then( m => m.ListarBoletasPageModule)
  },
  {
    path: 'detalle-boleta',
    loadChildren: () => import('./paginas/boleta/detalle-boleta/detalle-boleta.module').then( m => m.DetalleBoletaPageModule)
  },
  {
    path: 'editar-trabajador/:rut',
    loadChildren: () => import('./paginas/trabajadores/editar-trabajador/editar-trabajador.module').then(m => m.EditarTrabajadorPageModule)
  },
  {
    path: 'agregar-proveedor',
    loadChildren: () => import('./paginas/proveedores/agregar-proveedor/agregar-proveedor.module').then( m => m.AgregarProveedorPageModule)
  },
  {
    path: 'comprar-material',
    loadChildren: () => import('./paginas/ventas/comprar-material/comprar-material.module').then( m => m.ComprarMaterialPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
