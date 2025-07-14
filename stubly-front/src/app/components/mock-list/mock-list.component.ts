import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MockService } from '../../services/mock.service';

@Component({
  selector: 'app-mock-list',
  template: `
    <h2>Lista de Mocks</h2>
    <ul>
      <li *ngFor="let mock of mocks">
        <strong>{{ mock.path }}</strong> - 
        <button (click)="preview(mock.path)">Ver</button>
        <button (click)="editar.emit(mock)">Editar</button>
        <button (click)="delete(mock._id, mock.path)">Eliminar</button>
      </li>
    </ul>
  `
})
export class MockListComponent implements OnInit {
  @Output() editar = new EventEmitter<any>();
  mocks: any[] = [];

  constructor(private mockService: MockService) {}

  ngOnInit() {
    this.loadMocks();
    console.log("carga mocks");
  }

  loadMocks() {
    this.mockService.getMocks().subscribe(data => this.mocks = data);
  }

  preview(route: string) {
    const url = `http://localhost:3000/mock/${route}`;
    window.open(url, '_blank');
  }

  delete(id: string, route: string) {
    if(confirm("Procedemos a borrar el mock con endpoint " + route)) {
      this.mockService.deleteMock(id).subscribe(() => this.loadMocks());
    }
  }
}
