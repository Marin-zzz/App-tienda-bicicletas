import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CartComponent } from './cart/cart.component'; 
import { CarritoService } from './services/carrito.service'; 
import { AuthService } from './services/auth.service'; 
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BoletaService } from './services/boletas.service';
import { PokemonModalComponent } from './api/pokemon-modal/pokemon-modal.component';

// Importaciones necesarias para Firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment'; // Importa el archivo de configuración de Firebase
import { UsuarioService } from './services/usuario.service'; // Asegúrate de importar el UsuarioService

@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    PokemonModalComponent 
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    RouterModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    CarritoService, 
    AuthService,
    BoletaService,
    UsuarioService, // Agrega el UsuarioService aquí
    provideHttpClient(withInterceptorsFromDi())
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
