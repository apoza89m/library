import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    //lazy loading
    path: 'usuario',
    loadChildren: () =>
      import('./modules/usuario/usuario.module').then((m) => m.UsuarioModule),
    //canActivate: [authGuard],
  },
  {
    //lazy loading
    path: 'libreria',
    loadChildren: () =>
      import('./modules/libreria/libreria.module').then(
        (m) => m.LibreriaModule
      ),
  },
];
