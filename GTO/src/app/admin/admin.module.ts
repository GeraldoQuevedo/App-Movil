import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AdminPage } from './admin.page';

@NgModule({
  declarations: [AdminPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ]
})
export class AdminModule {}
