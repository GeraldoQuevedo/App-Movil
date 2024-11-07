import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProximosLibrosPageRoutingModule } from './proximos-libros-routing.module';

import { ProximosLibrosPage } from './proximos-libros.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProximosLibrosPageRoutingModule
  ],
  declarations: [ProximosLibrosPage]
})
export class ProximosLibrosPageModule {}
