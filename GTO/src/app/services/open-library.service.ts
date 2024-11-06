// open-library.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenLibraryService {
  private apiUrl = 'https://openlibrary.org';

  constructor(private http: HttpClient) {}

  // Método para buscar libros por título
  searchBooks(title: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search.json?title=${title}`);
  }

  // Método para obtener detalles de un libro por su ID de Open Library
  getBookDetails(bookId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/works/${bookId}.json`);
  }
}

export default OpenLibraryService;
