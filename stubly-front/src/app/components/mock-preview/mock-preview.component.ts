import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-mock-preview',
  template: `
    <h2>Vista previa de Mock</h2>
    <input type="text" [(ngModel)]="mockRoute" placeholder="Ruta del mock (ej: test)" />
    <button (click)="preview()">Previsualizar</button>

    <div *ngIf="response" style="background:#f4f4f4; margin-top:1rem; padding:1rem;">
      <pre>{{ response | json }}</pre>
    </div>

    <div *ngIf="error" style="color:red;">{{ error }}</div>
  `
})
export class MockPreviewComponent {
  mockRoute = '';
  response: any = null;
  error = '';

  constructor(private http: HttpClient) {}

  preview() {
    this.response = null;
    this.error = '';
    const url = `http://localhost:3000/mock/${this.mockRoute}`;
    console.log(url);
    this.http.get(url).subscribe({
      next: (res) => (this.response = res),
      error: (err) => (this.error = 'No se encontró o error al obtener el mock.'),
    });
  }
}
