import { Component, ViewChild, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VentaComponent } from '../venta/venta.component';
import { ApiserviceService } from '../../services/pizzeria.service';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, VentaComponent],
  providers: [ApiserviceService],
  templateUrl: './lista.component.html',
  styleUrls: [],
})
export class ListaComponent implements OnInit {
  @ViewChild(VentaComponent, { static: false }) ventasComponent?: VentaComponent;
  formGroup!: FormGroup;
  pedidos: any[] = []; // Inicialización correcta del tipo
  modal_show: boolean = false;

  constructor(private fb: FormBuilder, private apiservice: ApiserviceService) {}

  initForm(): FormGroup {
    return this.fb.group({
      selected: [''],
    });
  }

  ngOnInit(): void {
    this.getPedidos();
    this.formGroup = this.initForm();
  }

  getPedidos(): void {
    try {
      this.pedidos = this.apiservice.getPedidos();
    } catch (error) {
      console.error('Error al obtener los pedidos:', error);
    }
  }

  delete(): void {
    const selected = this.formGroup.value.selected;
    if (!selected) return; // Manejo de caso vacío
    try {
      this.apiservice.deletePedidos(selected);
      this.getPedidos();
    } catch (error) {
      console.error('Error al eliminar el pedido:', error);
    }
  }

  modal_verification(): void {
    this.modal_show = !this.modal_show;
  }

  terminar(): void {
    if (this.pedidos.length > 0) {
      try {
        const terminar_status = this.apiservice.terminarPedido(this.pedidos);
        if (terminar_status) {
          this.pedidos = [];
          this.modal_verification();
          this.ventasComponent?.ngOnInit();
        }
      } catch (error) {
        console.error('Error al terminar el pedido:', error);
      }
    }
  }
}
