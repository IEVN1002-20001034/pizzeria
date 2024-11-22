import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { ReactiveFormsModule, FormGroup, FormControl, FormBuilder } from '@angular/forms';

import { ApiserviceService } from './apiservice.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import FormularioComponent from "./componentes/formulario/formulario.component";
import { PedidosComponent } from "./componentes/pedidos/pedidos.component";
import { VentasComponent } from './componentes/ventas/ventas.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ReactiveFormsModule, HttpClientModule, FormularioComponent, PedidosComponent, VentasComponent],
  providers:[ApiserviceService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private apiService: ApiserviceService){}

  data:any

  // llamada():void{
  //   this.apiService.getAPI(JSON.stringify(this.data), 'message')
  //    .subscribe(
  //      response => {
  //        console.log('Datos recibidos:', response);
  //        this.data = response;
  //      },
  //      error => {
  //        console.error('Error al obtener los datos:', error);
  //      }
  //    );
  // }


  title = 'pizzeria';
}
