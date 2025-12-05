import { Routes } from '@angular/router';
import { publicGuard } from './core/guards/public-guard';
import { authGuard } from './core/guards/auth-guard';
    

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login-page/login-page').then(m => m.LoginPage),
    canActivate: [publicGuard] // 🔒 Solo si NO estás autenticado
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register-page/register-page').then(m => m.RegisterPage),
    canActivate: [publicGuard] // 🔒 Solo si NO estás autenticado
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./features/daisyui-page/daisyui-page').then(m => m.DaisyuiPage),
    // 🟢 CORRECCIÓN: Eliminado canActivate: [authGuard] para que sea pública
  },
  {
    path: 'estilos',
    loadComponent: () =>
      import('./features/estilos-page/estilos-page').then(m => m.EstilosPage),
    canActivate: [authGuard] // 🛡️ Requiere autenticación
  },
  {
    path: 'simpsons',
    loadComponent: () =>
      import('./features/simpsons-page/simpsons-page').then(m => m.SimpsonsPageComponent),
    canActivate: [authGuard] // 🛡️ Requiere autenticación
  },
  {
    path: 'simpsons/:id',
    loadComponent: () =>
      import('./features/simpson-detail-page/simpson-detail-page').then(m => m.SimpsonDetailPageComponent),
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];