import { Routes } from "@angular/router";
export default[
  {
      path:'form',
      loadComponent:()=> import('./pedido/pedido.component')
  },
  {
      path:'pedido',
      loadComponent:()=> import('./pedido/pedido.component')
  },
  {
      path:'form',
      loadComponent:()=> import('./pedido/pedido.component')
  },
] as Routes
