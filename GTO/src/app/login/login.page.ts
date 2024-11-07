import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';
  
  // Regex de validación para el correo electrónico
  emailPattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {}

  async ingresar() {
    console.log('Iniciar sesión presionado');
    console.log('Username:', this.username);
    console.log('Password:', this.password);

    const loading = await this.loadingController.create({
      message: 'Cargando...',
      duration: 2000 // Duración del spinner
    });

    await loading.present(); // Mostrar el spinner

    // Lógica de autenticación
    const isAuthenticated = this.authenticateUser(this.username, this.password);

    if (isAuthenticated) {
      // Si la autenticación es exitosa, almacena el correo en localStorage
      localStorage.setItem('userEmail', this.username);

      // Muestra la alerta de bienvenida
      await this.presentAlert();
      this.router.navigate(['/home']);
    } else {
      console.log('Credenciales incorrectas');
      alert('Usuario o contraseña incorrectos.');
    }

    await loading.dismiss(); // Descartar el spinner después de la carga
  }

  // Método para autenticar al usuario
  authenticateUser(username: string, password: string): boolean {
    return username && password ? true : false;
  }

  // Método para mostrar la alerta de bienvenida
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Bienvenido',
      message: 'Bienvenido usuario a la pagina BibliotecApp',
      buttons: ['OK'],
    });

    await alert.present();
    setTimeout(() => {
      alert.dismiss();
    }, 3000);
  }

  // Método para cerrar sesión (Logout)
  logout() {
    // Eliminar el correo del usuario de localStorage
    localStorage.removeItem('userEmail');
    
    // Redirigir a la página de inicio de sesión
    this.router.navigate(['/login']);
  }
}
