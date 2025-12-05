import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ThemeSwitcher } from '../../../../shared/components/theme-switcher/theme-switcher';
import { AuthService } from '../../../../core/services/firebase/auth';

@Component({
  selector: 'app-drawer',
  imports: [RouterModule, CommonModule,ThemeSwitcher],
  templateUrl: './drawer.html',
  styleUrls: ['./drawer.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Drawer { 
  // Dentro de la clase:
private authService = inject(AuthService);
private router = inject(Router);

currentUser = this.authService.currentUser;

logout() {
  if (confirm('¿Cerrar sesión?')) {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error al cerrar sesión:', error);
      }
    });
  }
}
}
