import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Importa el servicio
import { OpenLibraryService } from '../services/open-library.service';
import { DbserviceService } from '../services/bd.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  libros: any[] = [];
  searchQuery: string = '';
  dbSubscription!: Subscription;
  openLibrarySubscription!: Subscription;
  user: string | null = null; // Variable para almacenar el usuario logueado

  constructor(
    private openLibraryService: OpenLibraryService,
    private dbService: DbserviceService,
    private authService: AuthService // Inyectamos el servicio de autenticación
  ) {}

  ngOnInit() {
    this.user = this.authService.getUser(); // Obtenemos el usuario logueado
    this.dbSubscription = this.dbService.dbState().subscribe((ready: boolean) => {
      if (ready) {
        this.dbService.fetchLibros().subscribe(
          (libros: any[]) => {
            this.libros = libros;
          },
          (error) => {
            console.error('Error al cargar los libros de la base de datos:', error);
          }
        );
      }
    });
  }

  buscarLibros() {
    if (this.searchQuery.trim()) {
      this.openLibrarySubscription = this.openLibraryService.searchBooks(this.searchQuery).subscribe(
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

  // Método para cerrar sesión
  logout() {
    this.authService.logout();
    this.user = null; // Limpiamos el usuario logueado
  }

  ngOnDestroy() {
    if (this.dbSubscription) {
      this.dbSubscription.unsubscribe();
    }
    if (this.openLibrarySubscription) {
      this.openLibrarySubscription.unsubscribe();
    }
  }
}
