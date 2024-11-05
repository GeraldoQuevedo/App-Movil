import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { Libro } from '../class/libro';
import { Platform, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DbserviceService {

  public database!: SQLiteObject;
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

  /**
   * Método que crea la BD si no Existe o carga la existente
   */
  crearBD() {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'biblioteca.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        this.database = db;
        this.presentToast("Base de datos creada");
        // Llamo a crear la(s) tabla(s)
        this.crearTablas();
      }).catch(e => this.presentToast("Error creando la BD: " + e));
    });
  }

  /**
   * Método que crea la tabla de la BD si no Existe o carga la existente
   */
  async crearTablas() {
    try {
      await this.database.executeSql(this.tblLibros, []);
      this.presentToast("Tabla creada");
      this.cargarLibros();
      this.isDbReady.next(true);
    } catch (error) {
      this.presentToast("Error al crear la tabla: " + error);
    }
  }

  /**
   * Método que carga en la listaLibros TODO el contenido de la tabla libro
   */
  cargarLibros() {
    let items: Libro[] = [];
    this.database.executeSql('SELECT id, titulo, autor, descripcion, texto FROM libro', [])
      .then(res => {
        if (res.rows.length > 0) {
          for (let i = 0; i < res.rows.length; i++) {
            items.push({
              id: res.rows.item(i).id,
              titulo: res.rows.item(i).titulo,
              autor: res.rows.item(i).autor,
              descripcion: res.rows.item(i).descripcion,
              texto: res.rows.item(i).texto // Asegúrate de incluir el campo `texto` aquí
            });
          }
        }
        this.listaLibros.next(items); // Asegúrate de actualizar la lista aquí después de llenar `items`
      })
      .catch(error => this.presentToast("Error al cargar libros: " + error));
}


  /**
   * Método que inserta un registro en la tabla libro
   */
  async addLibro(titulo: string, autor: string, descripcion: string) {
    let data = [titulo, autor, descripcion];
    await this.database.executeSql('INSERT INTO libro(titulo, autor, descripcion) VALUES(?, ?, ?)', data);
    this.cargarLibros();
  }

  /**
   * Método que actualiza el título, autor y/o la descripción filtrando por el id
   */
  async updateLibro(id: number, titulo: string, autor: string, descripcion: string) {
    let data = [titulo, autor, descripcion, id];
    await this.database.executeSql('UPDATE libro SET titulo = ?, autor = ?, descripcion = ? WHERE id = ?', data);
    this.cargarLibros();
  }

  /**
   * Método que elimina un registro por id de la tabla libro
   */
  async deleteLibro(id: number) {
    await this.database.executeSql('DELETE FROM libro WHERE id = ?', [id]);
    this.cargarLibros();
  }

  /**
   * Método que verifica la suscripción del Observable
   */
  dbState() {
    return this.isDbReady.asObservable();
  }

  /**
   * Método que se ejecuta cada vez que se hace un cambio en la tabla de la BD
   */
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
