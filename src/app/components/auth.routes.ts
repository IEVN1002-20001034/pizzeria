import { Routes } from '@angular/router';

export default [
  {
    path: 'form',
    loadComponent: () =>
      import('./pedido/pedido.component').then((m) => m.PedidoComponent),
  },
  {
    path: 'pedido',
    loadComponent: () =>
      import('./pedido/pedido.component').then((m) => m.PedidoComponent),
  },
] as Routes;
