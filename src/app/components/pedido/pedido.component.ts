import { Component, ViewChild, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { ListaComponent } from '../lista/lista.component'; // RUTA ACTUALIZADA
import { ApiserviceService } from '../../services/pizzeria.service'; // RUTA ACTUALIZADA

interface Pizza {
  nombre: string;
  direccion: string;
  telefono: string;
  tamanio: string;
  jamon: boolean;
  pina: boolean;
  champi: boolean;
  cantidad: number;
  fecha: Date;
}

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [ReactiveFormsModule, ListaComponent],
  providers: [ApiserviceService],
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css'], // Corregido
})
export class PedidoComponent implements OnInit {
  @ViewChild(ListaComponent) pedidosComponent!: ListaComponent;

  formGroup!: FormGroup;
  pizzas: Pizza[] = [];

  constructor(private fb: FormBuilder, private apiservice: ApiserviceService) {}

  pizza: Pizza = {
    nombre: '',
    direccion: '',
    telefono: '',
    tamanio: '',
    jamon: false,
    pina: false,
    champi: false,
    cantidad: 0,
    fecha: new Date(),
  };

  ngOnInit(): void {
    this.formGroup = this.initForm();
  }

  initForm(): FormGroup {
    return this.fb.group({
      nombre: [''],
      direccion: [''],
      telefono: [''],
      tamanio: [''],
      jamon: [false],
      pina: [false],
      champi: [false],
      cantidad: [0],
      fecha: [''],
    });
  }

  onSubmit(): void {
    this.pizza = this.formGroup.value;
    this.apiservice.addPedido(this.pizza);
    if (this.pedidosComponent) {
      this.pedidosComponent.getPedidos();
    }
  }
}
