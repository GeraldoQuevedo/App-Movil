import { Component, OnInit } from '@angular/core';
import { OpenLibraryService } from '../services/open-library.service'; // Asegúrate de que esta ruta sea correcta
import { DbserviceService } from '../services/bd.service'; // Importa el servicio DbserviceService

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  libros: any[] = []; // Lista de resultados de búsqueda de libros
  searchQuery: string = ''; // Término de búsqueda

  constructor(private openLibraryService: OpenLibraryService, private dbService: DbserviceService) {} // Inyecta el servicio DbserviceService

  ngOnInit() {
    // Escuchar cambios en el estado de la base de datos
    this.dbService.dbState().subscribe((ready: boolean) => {
      if (ready) {
        // Si la base de datos está lista, carga los libros desde la base de datos
        this.dbService.fetchLibros().subscribe((libros: any[]) => {
          this.libros = libros;
        });
      }
    });
  }

  // Método para buscar libros usando la API de Open Library
  buscarLibros() {
    if (this.searchQuery.trim()) {
      this.openLibraryService.searchBooks(this.searchQuery).subscribe(
        (response) => {
          this.libros = response.docs.slice(0, 10).map((libro: any) => ({
            title: libro.title,
            author_name: libro.author_name ? libro.author_name[0] : 'Autor no disponible',
            first_publish_year: libro.first_publish_year,
            cover: libro.isbn ? `https://covers.openlibrary.org/b/ISBN/${libro.isbn[0]}-L.jpg` : 'assets/icon/default-book.jpg'
          }));
        },
        (error) => {
          console.error('Error al buscar libros:', error);
        }
      );
    }
  }
}
