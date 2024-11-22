import { Component, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { PedidosComponent } from '../pedidos/pedidos.component';

import { ApiserviceService } from '../../apiservice.service';

interface Pizza{
  nombre:string,
  direccion:string,
  telefono:string ,
  tamanio:string,
  jamon:boolean,
  pina:boolean,
  champi:boolean,
  cantidad:number,
  fecha:Date
}

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [ReactiveFormsModule, PedidosComponent],
  providers:[ApiserviceService],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export default class FormularioComponent {
  @ViewChild(PedidosComponent) pedidosComponent!: PedidosComponent;

  formGroup!:FormGroup;
  pizzas: Pizza[] = [];

  ngOnInit(): void {
    this.formGroup = this.initForm();
  }

  initForm():FormGroup{
    return this.fb.group({
      nombre:[''],
      direccion:[''],
      telefono:[''] ,
      tamanio:[''],
      jamon:[false],
      pina:[false],
      champi:[false],
      cantidad:[0],
      fecha: ['']
    })
  }

  constructor(private fb:FormBuilder, private apiservice:ApiserviceService){}

  pizza:Pizza = {
    nombre:'',
    direccion:'',
    telefono:'' ,
    tamanio:'',
    jamon:false,
    pina:false,
    champi:false,
    cantidad:0,
    fecha: new Date
  }

  onSubmit():void{
    this.pizza = this.formGroup.value;
    this.apiservice.addPedido(this.pizza);
    if (this.pedidosComponent) {
      this.pedidosComponent.getPedidos();
    }

  }



}
