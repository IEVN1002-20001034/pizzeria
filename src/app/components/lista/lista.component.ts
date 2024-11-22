import { Component, ViewChild, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { ApiserviceService } from '../../apiservice.service';
import { CommonModule } from '@angular/common';
import { VentasComponent } from '../ventas/ventas.component';

interface Pizza{
  nombre:string,
  direccion:string,
  telefono:string ,
  tamanio:string,
  jamon:boolean,
  pina:boolean,
  champi:boolean,
  cantidad:number
}


@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, VentasComponent],
  providers:[ApiserviceService],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})
export class PedidosComponent implements OnInit{
  @ViewChild(VentasComponent) ventasComponent!: VentasComponent;
  formGroup!:FormGroup;

  constructor(private fb:FormBuilder, private apiservice:ApiserviceService){}
  pedidos:any;
  modal_show:boolean = false;

  initForm():FormGroup{
    return this.fb.group({
      selected:[''],
    })
  }

  ngOnInit(): void {
    this.pedidos = this.apiservice.getPedidos();
    this.formGroup = this.initForm();
  }

  getPedidos():void{
    this.pedidos = this.apiservice.getPedidos();
  }

  delete(){
    const formdata = this.formGroup.value;
    this.pedidos = this.apiservice.deletePedidos(formdata);
    this.pedidos = this.apiservice.getPedidos();
  }

  modal_verification(){
    this.modal_show = !this.modal_show;
  }

  terminar():void{
    if(this.pedidos.length > 0){
      const terminar_status = this.apiservice.terminarPedido(this.pedidos);
      if(terminar_status){
        this.pedidos = [];
        this.modal_verification()
        if (this.ventasComponent) {
          this.ventasComponent.ngOnInit();
        }
      }
    }
  }

}
