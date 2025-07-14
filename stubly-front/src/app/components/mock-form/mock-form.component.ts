import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MockService } from '../../services/mock.service';

@Component({
  selector: 'app-mock-form',
  template: `
    <h2>{{ isEditMode ? 'Editar Mock' : 'Crear nuevo Mock' }}</h2>
    <form [formGroup]="mockForm" (ngSubmit)="onSubmit()">
      <label>Ruta:</label>
      <input type="text" formControlName="route" [readonly]="isEditMode" /><br />

      <label>Respuesta JSON:</label>
      <textarea formControlName="response" rows="6"></textarea><br />

      <button type="submit" [disabled]="mockForm.invalid">
        {{ isEditMode ? 'Actualizar' : 'Guardar' }}
      </button>

      <button *ngIf="isEditMode" type="button" (click)="cancelar.emit()" style="margin-left: 1rem;">
        Cancelar
      </button>
    </form>
    <p *ngIf="success" style="color:green;">
      {{ isEditMode ? 'Mock actualizado' : 'Mock creado' }} exitosamente ✅
    </p>
  `
})
export class MockFormComponent implements OnChanges {
  @Input() mock: any; // recibe un mock cuando se quiere editar
  @Output() cancelar = new EventEmitter<void>();
  mockForm: FormGroup;
  isEditMode = false;
  success = false;

  constructor(private fb: FormBuilder, private mockService: MockService) {
    this.mockForm = this.fb.group({
      route: ['', Validators.required],
      response: ['', Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['mock']) {
      this.isEditMode = !!this.mock;
      this.success = false;
      if (this.mock) {
        this.mockForm.patchValue({
          route: this.mock.route,
          response: JSON.stringify(this.mock.response, null, 2)
        });
      } else {
        this.mockForm.reset();
      }
    }
  }

  onSubmit() {
    const raw = this.mockForm.value;
    try {
      const payload = {
        route: raw.route,
        response: JSON.parse(raw.response)
      };

      if (this.isEditMode && this.mock._id) {
        this.mockService.updateMock(this.mock._id, payload).subscribe(() => {
          this.success = true;
        });
      } else {
        /*this.mockService.createMock(payload).subscribe(() => {
          this.success = true;
          this.mockForm.reset();
        });*/
      }

    } catch (e) {
      alert("Respuesta no es un JSON válido.");
    }
  }
}
