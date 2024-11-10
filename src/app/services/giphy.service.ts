import { Injectable } from '@angular/core';
import { GiphyResponse } from '../interfaces/giphy.interface';  // Interfaz que define la estructura de la respuesta de Giphy

@Injectable({
  providedIn: 'root'
})
export class GiphyService {
  
  // API key para acceder al servicio de Giphy
  private apiKey = 'IIIZDGsCf1BrYZVo6kDgkRfPYAueoVoU';  // Asegúrate de proteger esta clave en producción

  constructor() {}

  // Método para buscar un GIF de "congratulations" en la API de Giphy
  async buscarGifDeCongratulations(): Promise<GiphyResponse> {
    // Realiza una solicitud HTTP a la API de Giphy para buscar un GIF de "congratulations"
    const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=congratulations&limit=1&rating=g`);
    
    // Convierte la respuesta a formato JSON y la asigna al tipo GiphyResponse
    const data: GiphyResponse = await response.json();
    
    // Retorna los datos obtenidos
    return data;
  }
}
