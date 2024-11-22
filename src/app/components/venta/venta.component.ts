import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../../apiservice.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers:[ApiserviceService],
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.css'
})
export class VentasComponent implements OnInit {


  formGroup_dia!:FormGroup;
  formGroup_mes!:FormGroup;

  initForm_dia():FormGroup{
    return this.fb.group({
      dia_filtro:[''],
    })
  }
  initForm_mes():FormGroup{
    return this.fb.group({
      mes_filtro:[''],
    })
  }

  constructor (private fb:FormBuilder, private apiservice:ApiserviceService){}
  meses = [
      { 'value': 'enero', 'mes': 'Enero', 'num': '1' },
      { 'value': 'febrero', 'mes': 'Febrero', 'num': '2' },
      { 'value': 'marzo', 'mes': 'Marzo', 'num': '3' },
      { 'value': 'abril', 'mes': 'Abril', 'num': '4' },
      { 'value': 'mayo', 'mes': 'Mayo', 'num': '5' },
      { 'value': 'junio', 'mes': 'Junio', 'num': '6' },
      { 'value': 'julio', 'mes': 'Julio', 'num': '7' },
      { 'value': 'agosto', 'mes': 'Agosto', 'num': '8' },
      { 'value': 'septiembre', 'mes': 'Septiembre', 'num': '9' },
      { 'value': 'octubre', 'mes': 'Octubre', 'num': '10' },
      { 'value': 'noviembre', 'mes': 'Noviembre', 'num': '11' },
      { 'value': 'diciembre', 'mes': 'Diciembre', 'num': '12' }
  ];
  compras!:any;
  compras_mes!:any;
  total!:number;
  total_mes!:number;
  filtro:string = 'dia';

  // ngOnInit(): void {
  //   this.formGroup_dia = this.initForm_dia();
  //   this.formGroup_mes = this.initForm_mes();
  //   const compras_dia = this.apiservice.recuperarCompras_dia(null);
  //   const compras_mes = this.apiservice.recuperarCompras_mes(null);

  //   this.compras = compras_dia.subtotalPorNombreArray;
  //   this.total = compras_dia.total_total;
  //   this.compras_mes = compras_mes.subtotalPorNombreArray;
  //   this.total_mes = compras_mes.total_total;
  // }

  ngOnInit(): void {
    this.formGroup_dia = this.initForm_dia();
    this.formGroup_mes = this.initForm_mes();

    // console.log(this.compras);

    // Recuperar compras del día desde la API
    console.log('HOLA')
    this.apiservice.getPedidos_api().subscribe((data: any) => {
      // console.log(data)
      const compras_dia = this.apiservice.procesarCompras(data, null); // Filtrar compras por día actual
      console.log(compras_dia)
      this.compras = compras_dia.subtotalPorIdArray;
      this.total = compras_dia.total_total;

      console.log(this.compras)
      console.log('this.compras')
      console.log(this.total)
      console.log('this.total')
    });

    // Recuperar compras del mes desde la API
    this.apiservice.getPedidos_api().subscribe((data: any) => {
      const compras_mes = this.apiservice.procesarComprasPorMes(data, null); // Filtrar compras por mes actual
      this.compras_mes = compras_mes.subtotalPorIdArray;
      this.total_mes = compras_mes.total_total;
    });
  }

  filtrarDia(){
    const filtro = this.formGroup_dia.value;
    // console.log(filtro)
    if(!filtro){
      return console.log('No se ha escogido un mes')
    }
    // Recuperar compras del día desde la API
    this.apiservice.getPedidos_api().subscribe((data: any) => {
      console.log(data)
      const compras_dia = this.apiservice.procesarCompras(data, filtro.dia_filtro); // Filtrar compras por día actual
      this.compras = compras_dia.subtotalPorIdArray;
      this.total = compras_dia.total_total;

      console.log(this.compras)
      console.log('this.compras')
      console.log(this.total)
      console.log('this.total')
    });
  }

  filtrarMes(){
    const filtro = this.formGroup_mes.value;
    // console.log(filtro.value)
    if(!filtro){
      return console.log('No se ha escogido un mes')
    }
     // Recuperar compras del mes desde la API
    this.apiservice.getPedidos_api().subscribe((data: any) => {
      const compras_mes = this.apiservice.procesarComprasPorMes(data, filtro.mes_filtro); // Filtrar compras por mes actual
      this.compras_mes = compras_mes.subtotalPorIdArray;
      this.total_mes = compras_mes.total_total;
    });
  }

  cambiarestado(){
    if(this.filtro === 'dia')
      this.filtro = 'mes';
    else if(this.filtro === 'mes')
      this.filtro = 'dia'
  }

  // filtrarDia(){
  //   const filtro = this.formGroup_dia.value;
  //   console.log(filtro)
  //   if(!filtro){
  //     return console.log('No se ha escogido un mes')
  //   }

  //   const compras_dia = this.apiservice.recuperarCompras_dia(filtro.dia_filtro);
  //   this.compras = compras_dia.subtotalPorNombreArray;
  //   this.total = compras_dia.total_total;
  // }

  // filtrarMes(){
  //   const filtro = this.formGroup_mes.value;
  //   console.log(filtro)
  //   if(!filtro){
  //     return console.log('No se ha escogido un mes')
  //   }
  //   const compras_mes = this.apiservice.recuperarCompras_mes(filtro.mes_filtro);
  //   this.compras_mes = compras_mes.subtotalPorNombreArray;
  //   this.total_mes = compras_mes.total_total;
  // }
}
