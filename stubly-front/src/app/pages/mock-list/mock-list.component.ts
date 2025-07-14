
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MockService } from '../../services/mock.service';

@Component({
  selector: 'app-mock-list',
  templateUrl: './mock-list.component.html'
})
export class MockListComponent implements OnInit {
  mocks: any[] = [];
  token = localStorage.getItem('stubly_token');
  apiBaseUrl = 'http://localhost:3000/v1/mock/'; // o tu dominio actual

  constructor(private http: HttpClient, private mockService: MockService) {}

  ngOnInit(): void {
    console.log("Token:" + this.token);
    if (this.token) {
      this.mockService.getMocksByToken(this.token).subscribe({
        next: data => {this.mocks = data;},
        error: err => console.error('Error al cargar mocks', err)
      });
    }
  }

  probarMock(mock: any) {
    window.open(this.apiBaseUrl + mock.path, '_blank');
  }
}
