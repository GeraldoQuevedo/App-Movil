// admin.component.ts
import { Component } from '@angular/core';
import { DbserviceService } from '../services/bd.service';  // Asegúrate de importar el servicio
import { Libro } from '../class/libro';  // Asegúrate de que la clase Libro esté correctamente definida

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage {
  bookId: number | undefined;
  newTitle: string = '';
  newAuthor: string = '';
  newDescription: string = '';
  newText: string = '';

  constructor(private dbService: DbserviceService) {}

  // Método para actualizar un libro
  updateBook() {
    if (this.bookId && this.newTitle && this.newAuthor && this.newDescription && this.newText) {
      this.dbService.actualizarLibro(
        this.bookId,
        this.newTitle,
        this.newAuthor,
        this.newDescription,
        this.newText
      ).then(response => {
        console.log('Libro actualizado exitosamente', response);
      }).catch(error => {
        console.error('Error al actualizar el libro', error);
      });
    } else {
      console.error('Todos los campos son obligatorios');
    }
  }

  // Método para eliminar un libro
  deleteBook() {
    if (this.bookId !== undefined) {
      this.dbService.eliminarLibro(this.bookId).then(response => {
        console.log('Libro eliminado exitosamente', response);
      }).catch(error => {
        console.error('Error al eliminar el libro', error);
      });
    } else {
      console.error('El ID del libro es obligatorio para eliminar');
    }
  }
}
