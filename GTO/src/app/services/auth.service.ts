import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedInUser: string | null = null;

  // Simula el proceso de autenticación
  authenticate(username: string, password: string): boolean {
    if (username === 'usuario@correo.com' && password === '12345') {
      this.loggedInUser = username;
      return true;
    }
    return false;
  }

  // Obtiene el usuario autenticado
  getUser() {
    return this.loggedInUser;
  }

  // Cierra sesión
  logout() {
    this.loggedInUser = null;
  }
}
