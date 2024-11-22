import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private http:HttpClient){}
  private apiurl = 'http://127.0.0.1:5000/api'
  addPedido(data:any): boolean {
    const id = `pedido_${Date.now()}`;
    data.id = id;

    const pedidos = JSON.parse(localStorage.getItem('pedidos') || '[]');
    pedidos.push(data);

    localStorage.setItem('pedidos', JSON.stringify(pedidos));

    return true;
  }

  getPedidos(): any {
    const pedidos = JSON.parse(localStorage.getItem('pedidos') || '[]');

    pedidos.forEach((item:any) => {
      let sub = 0;
      if(item.pina) sub += 10;
      if(item.champi) sub += 10;
      if(item.jamon) sub += 10;
      if(item.tamanio == 'chica') sub += 40;
      if(item.tamanio == 'mediana') sub += 80;
      if(item.tamanio == 'grande') sub += 120;
      item.subtotal = sub * item.cantidad;
    });
    return pedidos;
  }

  deletePedidos(data:any): any {
    const pedidos = JSON.parse(localStorage.getItem('pedidos') || '[]');
    let pedidos_no_del: any[] = [];
    pedidos.forEach((item:any) => {
      // console.log(data.selected + ' ' +item.id)
      if(data.selected !== item.id)
        pedidos_no_del.push(item);
    });

    localStorage.setItem('pedidos', JSON.stringify(pedidos_no_del));
  }

  terminarPedido(data:any): any{
    const id = `compra_${Date.now()}`;

    let total = 0;
    let total_nombre : any[] = [];
    data.forEach((item:any) => {
      // console.log(item.subtotal + ' ' +item.id)
      total += item.subtotal;
      let nombre = item.nombre;
      let sub = item.subtotal;
      let fecha = item.fecha;
      total_nombre.push({nombre, sub, fecha})
    });

    // data.push(id)
    const payload = { 'pedidos': data, "id_compra": id };
    // console.log(payload)
    const compras = JSON.parse(localStorage.getItem('compras') || '[]');
    compras.push({ id, total, total_nombre, items: data });

    // console.log(compras)

    // localStorage.setItem('compras', JSON.stringify(compras));
    localStorage.removeItem('pedidos');

    /////////////////////PROCESO API

    this.sendPedido(JSON.stringify(payload))
    .subscribe(
      response => {
        console.log('Datos recibidos:', response);
        const result = response;
        return result
      },
      error => {
        console.error('Error al obtener los datos:', error);
        return false
      }
    );

    /////////////////////

    return true
  }


  procesarComprasPorMes(data: any, mes: any): any {
    const subtotalPorIdArray: { idpedido: string; nombre: string; sub: number }[] = [];
    let mesActual = mes || new Date().toISOString().slice(5, 7); // Default: Mes actual
    let total_total = 0;



    data.pedidos.forEach((pedido: any) => {
      // Convertir fecha del pedido al formato 'YYYY-MM'
      const mesPedido = new Date(pedido.fecha).toISOString().slice(5, 7);

      console.log(mesPedido)
      console.log(mesActual)
      if (mesPedido === mesActual) {
        total_total += pedido.subtotal;

        const existingEntry = subtotalPorIdArray.find(entry => entry.idpedido === pedido.idpediddo.trim());

        if (existingEntry) {
          // Sumar el subtotal al existente
          existingEntry.sub += pedido.subtotal;
        } else {
          // Agregar un nuevo registro con idpedido, nombre y subtotal
          subtotalPorIdArray.push({
            idpedido: pedido.idpediddo.trim(),
            nombre: pedido.nombre.trim(),
            sub: pedido.subtotal
          });
        }
      }
    });

    return { subtotalPorIdArray, total_total };
  }




  procesarCompras(data: any, fecha: any): any {
    const subtotalPorIdArray: { idpedido: string; nombre: string; sub: number }[] = [];
    let fechaHoy = fecha || new Date().toISOString().split('T')[0];
    let total_total = 0;

    // console.log('DATA: ');
    // console.log(data);

    data.pedidos.forEach((pedido: any) => {
      const fechaPedido = new Date(pedido.fecha).toISOString().split('T')[0];

      if (fechaPedido === fechaHoy) {
        total_total += pedido.subtotal;

        const existingEntry = subtotalPorIdArray.find(entry => entry.idpedido === pedido.idpediddo.trim());

        if (existingEntry) {
          // Sumar el subtotal al existente
          existingEntry.sub += pedido.subtotal;
        } else {
          // Agregar un nuevo registro con idpedido, nombre y subtotal
          subtotalPorIdArray.push({
            idpedido: pedido.idpediddo.trim(),
            nombre: pedido.nombre.trim(),
            sub: pedido.subtotal
          });
        }
      }
    });

    // console.log(subtotalPorIdArray)

    return { subtotalPorIdArray, total_total };
  }



  recuperarCompras_dia(fecha:any):any{
    const compras = JSON.parse(localStorage.getItem('compras') || '[]');
    const subtotalPorNombreArray: { nombre: string; sub: number }[] = [];
    let fechaHoy
    if(fecha == null){
      fechaHoy = new Date().toISOString().split('T')[0];
    }
    else {
      fechaHoy = fecha
    }

    let total_total = 0;
    compras.forEach((item: any) => {
      item.total_nombre.forEach((nombreItem: any) => {
        if (nombreItem.fecha === fechaHoy) {
          total_total += nombreItem.sub;
          const existingEntry = subtotalPorNombreArray.find(entry => entry.nombre === nombreItem.nombre);

          if (existingEntry) {
              existingEntry.sub += nombreItem.sub;
          } else {
              subtotalPorNombreArray.push({ nombre: nombreItem.nombre, sub: nombreItem.sub });
          }
        }
      });
    });
    return {subtotalPorNombreArray, total_total};
  }

  recuperarCompras_mes(fecha:any):any{
    const compras = JSON.parse(localStorage.getItem('compras') || '[]');

    const subtotalPorNombreArray: { nombre: string; sub: number }[] = [];

    let mes
    if (fecha == null){
      mes = String(new Date().getMonth() + 1)
    }
    else mes = fecha ;

    let total_total = 0;
    compras.forEach((item: any) => {
      item.total_nombre.forEach((nombreItem: any) => {
        const añoMesItem = nombreItem.fecha.slice(5, 7);
        if (añoMesItem === mes) {
          total_total += nombreItem.sub;
          const existingEntry = subtotalPorNombreArray.find(entry => entry.nombre === nombreItem.nombre);

          if (existingEntry) {
              existingEntry.sub += nombreItem.sub;
          } else {
              subtotalPorNombreArray.push({ nombre: nombreItem.nombre, sub: nombreItem.sub });
          }
        }
      });
    });
    return {subtotalPorNombreArray, total_total};
  }


  sendPedido(data:any): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`${this.apiurl}/addpedido`, data, {headers})
  }

  getPedidos_api(): Observable<any> {
    return this.http.get<any>(`${this.apiurl}/getpedidos`)
  }

}
