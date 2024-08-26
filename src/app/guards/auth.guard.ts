import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const platformId = inject(PLATFORM_ID);
  const router = inject(Router);
  const snackBar = inject(MatSnackBar);

  //verificar si estamos en el entorno del navegador
  if (isPlatformBrowser(platformId)) {
    const token = sessionStorage.getItem('token');

    if (token) {
      return true;
    } else {
      snackBar.open('Debe loguear primero', 'Cerrar', {
        duration: 3000,
      });
      router.navigate(['usuario/login']);
      return false; // Bloquear acceso
    }
  } else {
    console.error(
      'El guard se ejecutó en un entorno sin sessionStorage disponible'
    );
    return false;
  }
};
