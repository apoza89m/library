import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpositorComponent } from './expositor/expositor.component';
import { authGuard } from '../../guards/auth.guard';
import { CreacionComponent } from './creacion/creacion.component';

const routes: Routes = [
  {
    path: 'expositor',
    component: ExpositorComponent,
  },
  {
    path: 'creacion',
    component: CreacionComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibreriaRoutingModule {}
