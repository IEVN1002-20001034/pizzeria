import { Injectable } from '@angular/core';

interface Pizzeria {
  tamanio: string;
  ingredientes: string[];
  cantidad: number;
  subtotal: number;
}

interface Pedido {
  cliente: { nombre: string; direccion: string; telefono: string; fecha: string };
  pizzas: Pizzeria[];
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class PizzaPedidoService {
  private pedidos: Pedido = { cliente: { nombre: '', direccion: '', telefono: '', fecha: '' }, pizzas: [], total: 0 };
  private ventas: Pedido[] = [];
  private clienteHabilitado = true; 
  constructor() { 
    const ventasGuardadas = localStorage.getItem('ventas');
    if (ventasGuardadas) {
      this.ventas = JSON.parse(ventasGuardadas);
    }
  }
  clienteOcultado(): boolean {
    return !this.clienteHabilitado;
  }

  habilitarCliente() {
    this.clienteHabilitado = true;
  }

  deshabilitarCliente() {
    this.clienteHabilitado = false;
  }

  agregarcliente(cliente: Pedido['cliente']) {
      this.pedidos.cliente = {
        nombre: cliente.nombre,
        direccion: cliente.direccion,
        telefono: cliente.telefono,
        fecha: cliente.fecha
      };
    }
  

  agregarPizza(pizza: Pizzeria) {
    this.pedidos.pizzas.push({
      tamanio: pizza.tamanio,
      ingredientes: pizza.ingredientes.slice(), 
      cantidad: pizza.cantidad,
      subtotal: pizza.subtotal
    });
    this.calcularTotal();
  }

  eliminarPizza(index: number) {
    this.pedidos.pizzas.splice(index, 1);
    this.calcularTotal();
  }

  private calcularTotal() {
    this.pedidos.total = 0;
    this.pedidos.pizzas.forEach(pizza => {
      this.pedidos.total += pizza.subtotal;
    });
  }

  getPedidoActual() {
    return this.pedidos;
  }

  confirmarPedido() {
    const pedidoCopia: Pedido = {
      cliente: {
        nombre: this.pedidos.cliente.nombre,
        direccion: this.pedidos.cliente.direccion,
        telefono: this.pedidos.cliente.telefono,
        fecha: this.pedidos.cliente.fecha
      },
      pizzas: this.pedidos.pizzas.map(pizza => ({
        tamanio: pizza.tamanio,
        ingredientes: pizza.ingredientes.slice(), 
        cantidad: pizza.cantidad,
        subtotal: pizza.subtotal
      })),
      total: this.pedidos.total
    };

    this.ventas.push(pedidoCopia);
    this.guardarVentas(); 
    this.pedidos = { cliente: { nombre: '', direccion: '', telefono: '', fecha: '' }, pizzas: [], total: 0 };
  }

  private guardarVentas() {
    localStorage.setItem('ventas', JSON.stringify(this.ventas));
  }

  VentasPorDia(diaSemana: string): Pedido[] {
    const dias = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
    return this.ventas.filter(pedido => {
        const fecha = new Date(pedido.cliente.fecha);
        const dia = dias[fecha.getDay()]; 
        return dia === diaSemana;
    });
}

VentasPorMes(mes: string): Pedido[] {
  return this.ventas.filter(pedido => 
      pedido.cliente.fecha && pedido.cliente.fecha.slice(0, 7) === mes 
  );
}

}
