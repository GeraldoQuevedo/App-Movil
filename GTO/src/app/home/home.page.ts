import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  libros: any[] = []; // Declarar la propiedad libros como un array

  constructor() {}

  ngOnInit() {
    // Aquí podrías cargar los datos de Firebase si tienes el servicio configurado
    this.libros = [
      {
        titulo: 'Crimen y Castigo',
        autor: 'Fiódor Dostoyevski',
        descripcion: 'La historia narra la vida de Rodión Raskólnikov...',
        texto: 'Un breve resumen o descripción aquí.'
      },
      {
        titulo: 'Don Quijote De La Mancha',
        autor: 'Miguel de Cervantes Saavedra',
        descripcion: 'El ingenioso hidalgo don Quijote de la Mancha...',
        texto: 'Otro breve resumen aquí.'
      }
      // Agrega más libros si es necesario
    ];
  }
}
