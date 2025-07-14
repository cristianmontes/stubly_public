import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class MockService {
  private baseUrl = 'http://localhost:3000/api/mocks';

  constructor(private http: HttpClient) {}

  getMocks() {
    return this.http.get<any[]>(this.baseUrl);
  }

  deleteMock(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  createMock(mock: { method: string, path: string; response: any, name: string}, token: string): any {
    mock.path = this.normalizePath(mock.path);
    return this.http.post(this.baseUrl, mock, {
      headers: { 'x-session-token': token },
    });
  }

  updateMock(id: string, mock: { route: string; response: any }) {
    return this.http.put(`${this.baseUrl}/${id}`, mock);
  }
  
  getMocksByToken(token: string) {
    return this.http.get<any[]>(this.baseUrl+'/by-token/'+token);
  }

  normalizePath(path: string): string {
    return '/' + path
    .replace(/\s+/g, '')        // elimina todos los espacios en blanco
    .replace(/\/+/g, '/')       // normaliza múltiples barras
    .replace(/^\/+/, '');       // elimina barras iniciales antes de anteponer una sola
  }
}
