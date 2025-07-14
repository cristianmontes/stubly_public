import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', // <-- ahora usa archivo externo
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  mockSeleccionado: any = null;

  onEditar(mock: any) {
    this.mockSeleccionado = mock;
  }

  cancelarEdicion() {
    this.mockSeleccionado = null;
  }
}
