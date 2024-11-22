import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'pizzeria',
    loadChildren: () =>
      import('./components/auth.routes').then((m) => m.default), // Ajuste en la ruta y formato
  },
  {
    path: '**', // Redirecciona rutas no encontradas
    redirectTo: 'pizzeria',
  },
];
