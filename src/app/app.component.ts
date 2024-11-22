import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ApiserviceService } from './services/pizzeria.service';
import { ListaComponent } from './components/lista/lista.component';
import { PedidoComponent } from './components/pedido/pedido.component';
import { VentaComponent } from './components/venta/venta.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ReactiveFormsModule, HttpClientModule, ListaComponent, PedidoComponent, VentaComponent],
  providers:[ApiserviceService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private apiService: ApiserviceService){}

  data:any



  title = 'pizzeria';
}
