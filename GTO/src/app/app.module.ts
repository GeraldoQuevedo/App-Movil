import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AdminModule } from './admin/admin.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { GalleryComponent } from './gallery/gallery.component';  // Importa tu componente Gallery

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    GalleryComponent,  // Declara tu componente aquí
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AdminModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    SQLite,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
