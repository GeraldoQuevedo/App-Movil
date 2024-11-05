import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { DbserviceService } from '../services/bd.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private alertController: AlertController,
    private bdService: DbserviceService,
    private loadingController: LoadingController
  ) { }
  

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
      // Si la autenticación es exitosa, muestra la alerta y redirige a la página Home
      await this.presentAlert();
      this.router.navigate(['/home']); // Navegación suave
    } else {
      console.log('Credenciales incorrectas');
      alert('Usuario o contraseña incorrectos.');
    }

    await loading.dismiss(); // Descartar el spinner después de la carga
  }

  // Método para autenticar al usuario
  authenticateUser(username: string, password: string): boolean {
    if (username === 'usuario@correo.com' && password === '123456') {
      return true; // Autenticación exitosa
    }
    return false; // Fallo en la autenticación
  }

  // Método para mostrar la alerta de bienvenida
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Bienvenido',
      message: 'Bienvenido usuario a la pagina BibliotecApp',
      buttons: ['OK']
    });

    await alert.present();
    // delay para que la alerta dure unos segundos
    setTimeout(() => {
      alert.dismiss(); // Cierra la alerta después de 2 segundos
    }, 3000);
  }
}
