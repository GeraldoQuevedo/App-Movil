import { Libro } from './libro';

describe('Libro', () => {
  it('should create an instance', () => {
    const libro = new Libro(1, 'Título Ejemplo', 'Autor Ejemplo', 'Descripción del libro', 'Texto del libro');
    expect(libro).toBeTruthy();
  });
});
