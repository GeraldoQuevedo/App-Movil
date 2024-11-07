import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProximosLibrosPage } from './proximos-libros.page';

const routes: Routes = [
  {
    path: '',
    component: ProximosLibrosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProximosLibrosPageRoutingModule {}
