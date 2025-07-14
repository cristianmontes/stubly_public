import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MockService } from '../../services/mock.service';
import { Router } from '@angular/router';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-mock-builder',
  templateUrl: './mock-builder.component.html',
  styleUrls: ['./mock-builder.component.css']
})
export class MockBuilderComponent {
  token: string;
  mockForm: FormGroup;
  nuevoMock = {
    method: 'GET',
    path: '',
    response: '{ "mensaje": "respuesta de ejemplo" }',
    name: ''
  };

  //apiBaseUrl = 'http://localhost:3000/v1/mock/'; // o tu dominio actual
  apiBaseUrl = 'https://stubly-api.onrender.com/v1/mock/'; // o tu dominio actual

  mockCreado: any = null;
  respuestaMock: string | null = null;
  alerta: { tipo: 'info' | 'error' | 'success', mensaje: string } | null = null;

  constructor(private fb: FormBuilder, private mockService: MockService,
      private router: Router, private analytics: AnalyticsService ) {
    this.mockForm = this.fb.group({
      method: ['', Validators.required],
      path: ['', Validators.required],
      response: ['', Validators.required],
      name: ['', Validators.required],
    });
  }

  ngOnInit() {
    const tokenKey = 'stubly_token';
    let token = localStorage.getItem(tokenKey);

    if (!token) {
      token = crypto.randomUUID();
      localStorage.setItem(tokenKey, token);
    }

    this.token = token;
  }

  crearMock() {
    console.log("creando mock")
    if (!this.validarTamañoResponse()) {
      this.alerta = { tipo: 'error', mensaje: 'La respuesta JSON excede los 10 mil caracteres permitidos.' };
      return;
    }
    
    this.respuestaMock = null;

    const raw = this.mockForm.value;
    try {
      const payload = {
        method: raw.method,
        path: raw.path,
        response: JSON.parse(raw.response),
        name: raw.name
      };

      this.mockService.createMock(payload, this.token).subscribe({
        next: (data) => {
          this.mockCreado = data;
          this.nuevoMock = {
            method: 'GET',
            path: '',
            response: '{ "mensaje": "respuesta de ejemplo" }',
            name: ''
          };
          this.analytics.trackEvent('crear_mock', {
            method: this.nuevoMock.method,
            path: this.nuevoMock.path
          });
        },
        error: (error) => {
          console.error('Error al crear el mock:', error);
          // Puedes mostrar una alerta visual también:
          this.alerta = {
            tipo: 'error',
            mensaje: error.error?.error || 'Error inesperado al crear el mock'
          };
        }
      });

    } catch (e) {
      //alert("Respuesta no es un JSON válido.");
      this.alerta = { tipo: 'error', mensaje: 'El campo Respuesta no es un JSON válido.' };
      return;
    }
    this.alerta = { tipo: 'success', mensaje: 'Mock creado correctamente' };
  }

  probarMock() {
      this.respuestaMock = this.mockCreado.response;
  }

  irALista() {
    this.router.navigate(['/mis-mocks']); // Ajusta la ruta según tu app
  }

  validarTamañoResponse(): boolean {
    const texto = typeof this.nuevoMock.response === 'string'
      ? this.nuevoMock.response
      : JSON.stringify(this.nuevoMock.response);

    const sizeInBytes = new TextEncoder().encode(texto).length;
    console.log("tamaño de json " + sizeInBytes);
    return sizeInBytes <= 10000; // 1024 caracteres aprox
  }
}
