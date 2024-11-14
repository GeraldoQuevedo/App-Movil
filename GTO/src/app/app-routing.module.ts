import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { GalleryComponent } from './gallery/gallery.component';

const routes: Routes = [
  // Ruta por defecto
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  // Rutas principales de la aplicación
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'gallery',
    component: GalleryComponent
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then(m => m.RegistroPageModule)
  },
  // Rutas de las páginas dentro de la sección de "pages"
  {
    path: 'catalogo',
    loadChildren: () => import('./pages/catalogo/catalogo.module').then(m => m.CatalogoPageModule)
  },
  {
    path: 'prestamos',
    loadChildren: () => import('./pages/prestamos/prestamos.module').then(m => m.PrestamosPageModule)
  },
  {
    path: 'gallery',
    loadChildren: () => import('./gallery/gallery.component').then(m => m.GalleryComponent)
  },
  {
    path: 'proximos-libros',
    loadChildren: () => import('./pages/proximos-libros/proximos-libros.module').then(m => m.ProximosLibrosPageModule)
  },
  {
    path: 'contactanos',
    loadChildren: () => import('./pages/contactanos/contactanos.module').then(m => m.ContactanosPageModule)
  },
  // Ruta para el AdminPage
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  // Ruta comodín para el error 404
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
