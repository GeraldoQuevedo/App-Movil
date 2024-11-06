import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { Libro } from '../class/libro'; // Asegúrate de tener la clase Libro definida
import { Platform, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DbserviceService {

  public bd!: SQLiteObject; // Aquí cambiamos 'database' por 'bd'
  tblLibros: string = "CREATE TABLE IF NOT EXISTS libro(id INTEGER PRIMARY KEY AUTOINCREMENT, titulo VARCHAR(50) NOT NULL, autor VARCHAR(50) NOT NULL, descripcion TEXT, texto TEXT);";
  listaLibros = new BehaviorSubject<Libro[]>([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private sqlite: SQLite,
    private platform: Platform,
    public toastController: ToastController
  ) {
    this.crearBD();
  }

  // Métodos para crear la base de datos, insertar y recuperar libros
  crearBD() {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'bd.db', // Aquí usas el nombre 'bd.db' para la base de datos
        location: 'default'
      }).then((bd: SQLiteObject) => { // Cambié 'db' por 'bd' aquí también
        this.bd = bd; // Asignamos la base de datos a la propiedad 'bd'
        this.presentToast("Base de datos creada");
        this.crearTablas();
      }).catch(e => this.presentToast("Error creando la BD: " + e));
    });
  }

  async crearTablas() {
    try {
      await this.bd.executeSql(this.tblLibros, []); // Usamos 'bd' en lugar de 'db'
      this.presentToast("Tabla creada");
      this.cargarLibros();
      this.isDbReady.next(true);
    } catch (error) {
      this.presentToast("Error al crear la tabla: " + error);
    }
  }

  cargarLibros() {
    let items: Libro[] = [];
    this.bd.executeSql('SELECT id, titulo, autor, descripcion, texto FROM libro', []) // 'bd' aquí también
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
        this.listaLibros.next(items);
      })
      .catch(error => this.presentToast("Error al cargar libros: " + error));
  }

  // Otros métodos para agregar, actualizar, eliminar libros y gestionar la base de datos...

  dbState(): Observable<boolean> {
    return this.isDbReady.asObservable();
  }

  fetchLibros(): Observable<Libro[]> {
    return this.listaLibros.asObservable();
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
  }
}
