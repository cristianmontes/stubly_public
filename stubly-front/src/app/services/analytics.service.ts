import { Injectable } from '@angular/core';

declare let gtag: Function;

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  constructor() {}

  /**
   * Envía un evento personalizado a Google Analytics
   * @param eventName Nombre del evento (ej. 'crear_mock')
   * @param params Objeto con parámetros adicionales (opcional)
   */
  trackEvent(eventName: string, params: { [key: string]: any } = {}) {
    try {
      gtag('event', eventName, params);
    } catch (error) {
      console.warn('No se pudo enviar evento a GA:', error);
    }
  }

  /**
   * Configura Google Analytics manualmente si es necesario
   */
  configGA(measurementId: string) {
    try {
      gtag('config', measurementId, { anonymize_ip: true });
    } catch (error) {
      console.warn('No se pudo configurar GA:', error);
    }
  }
}
