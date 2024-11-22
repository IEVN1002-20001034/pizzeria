import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../../services/pizzeria.service'; // RUTA ACTUALIZADA
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [ApiserviceService],
  templateUrl: './venta.component.html',
  styleUrls: [], 
})
export class VentaComponent implements OnInit {
  formGroup_dia!: FormGroup;
  formGroup_mes!: FormGroup;

  constructor(private fb: FormBuilder, private apiservice: ApiserviceService) {}

  meses = [
    { value: 'enero', mes: 'Enero', num: '1' },
    { value: 'febrero', mes: 'Febrero', num: '2' },
    // ...
  ];

  ngOnInit(): void {
    this.formGroup_dia = this.initForm_dia();
    this.formGroup_mes = this.initForm_mes();
    // Lógica de inicialización
  }

  initForm_dia(): FormGroup {
    return this.fb.group({
      dia_filtro: [''],
    });
  }

  initForm_mes(): FormGroup {
    return this.fb.group({
      mes_filtro: [''],
    });
  }

  filtrarDia() {
    // Implementación del filtro por día
  }

  filtrarMes() {
    // Implementación del filtro por mes
  }
}
