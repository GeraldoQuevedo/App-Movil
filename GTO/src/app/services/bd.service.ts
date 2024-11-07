import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { Libro } from '../class/libro';
import { Platform, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DbserviceService {

  private bd!: SQLiteObject; // Base de datos SQLite
  private tblLibros: string = `CREATE TABLE IF NOT EXISTS libro(
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    titulo VARCHAR(50) NOT NULL, 
    autor VARCHAR(50) NOT NULL, 
    descripcion TEXT, 
    texto TEXT
  );`;

  private listaLibros = new BehaviorSubject<Libro[]>([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false); // Estado de la base de datos

  constructor(
    private sqlite: SQLite,
    private platform: Platform,
    private toastController: ToastController
  ) {
    this.crearBD();
  }

  // Método para crear la base de datos y la tabla de libros
  private crearBD() {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'bd.db', // Nombre de la base de datos
        location: 'default'
      }).then((db: SQLiteObject) => {
        this.bd = db; // Asigna la base de datos a la propiedad bd
        this.presentToast("Base de datos creada");
        this.crearTablas();
      }).catch(e => this.presentToast("Error creando la BD: " + e));
    });
  }

  // Método para crear la tabla de libros
  private async crearTablas() {
    try {
      await this.bd.executeSql(this.tblLibros, []); // Crea la tabla si no existe
      this.presentToast("Tabla creada");
      this.cargarLibros();
      this.isDbReady.next(true); // Actualiza el estado de la base de datos
    } catch (error) {
      this.presentToast("Error al crear la tabla: " + error);
    }
  }

  // Método para cargar todos los libros desde la base de datos
  private cargarLibros() {
    const items: Libro[] = [];
    this.bd.executeSql('SELECT id, titulo, autor, descripcion, texto FROM libro', [])
      .then(res => {
        if (res.rows.length > 0) {
          for (let i = 0; i < res.rows.length; i++) {
            items.push({
              id: res.rows.item(i).id,
              titulo: res.rows.item(i).titulo,
              autor: res.rows.item(i).autor,
              descripcion: res.rows.item(i).descripcion,
              texto: res.rows.item(i).texto
            });
          }
        }
        this.listaLibros.next(items); // Actualiza la lista de libros
      })
      .catch(error => this.presentToast("Error al cargar libros: " + error));
  }

  // Método para actualizar un libro por su ID
  async actualizarLibro(id: number, titulo: string, autor: string, descripcion: string, texto: string) {
    const query = `UPDATE libro SET titulo = ?, autor = ?, descripcion = ?, texto = ? WHERE id = ?`;
    try {
      await this.bd.executeSql(query, [titulo, autor, descripcion, texto, id]);
      this.presentToast("Libro actualizado correctamente");
      this.cargarLibros();
    } catch (error) {
      this.presentToast("Error al actualizar el libro: " + error);
    }
  }

  // Método para eliminar un libro por su ID
  async eliminarLibro(id: number) {
    const query = `DELETE FROM libro WHERE id = ?`;
    try {
      await this.bd.executeSql(query, [id]);
      this.presentToast("Libro eliminado correctamente");
      this.cargarLibros();
    } catch (error) {
      this.presentToast("Error al eliminar el libro: " + error);
    }
  }

  // Método para verificar si la base de datos está lista
  dbState(): Observable<boolean> {
    return this.isDbReady.asObservable();
  }

  // Método para obtener la lista de libros como Observable
  fetchLibros(): Observable<Libro[]> {
    return this.listaLibros.asObservable();
  }

  // Método para mostrar un mensaje de toast
  private async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
  }
}
