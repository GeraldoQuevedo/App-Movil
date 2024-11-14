import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { OpenLibraryService } from '../services/open-library.service';
import { DbserviceService } from '../services/bd.service';
import { Subscription } from 'rxjs';

// Importa el plugin de cámara de Capacitor
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

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

  // Nueva propiedad para almacenar la URL de la imagen tomada
  photoUrl: string | null = null;

  constructor(
    private openLibraryService: OpenLibraryService,
    private dbService: DbserviceService,
    private authService: AuthService
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

  // Método para buscar libros en Open Library
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

  // Método para tomar una foto con la cámara
  async takePhoto() {
    try {
      const photo = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera
      });
  
      // Verificamos si photo.webPath tiene un valor antes de asignarlo
      if (photo.webPath) {
        this.photoUrl = photo.webPath;
      } else {
        console.error('No se obtuvo una URL válida para la foto');
        this.photoUrl = null;
      }
  
      console.log('Foto tomada:', this.photoUrl);
    } catch (error) {
      console.error('Error al tomar la foto:', error);
    }
  }
  

  // Método para cerrar sesión
  logout() {
    this.authService.logout();
    this.user = null;
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
