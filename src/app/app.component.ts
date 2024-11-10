import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { MenuController } from '@ionic/angular'; // Importar MenuController

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    public authService: AuthService,
    private router: Router,
    private menu: MenuController // Añadir MenuController al constructor
  ) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']); // Redirige a la página principal después de cerrar sesión
  }

  closeMenu() {
    this.menu.close(); // Método para cerrar el menú
  }
}
