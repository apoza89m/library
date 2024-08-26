import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { LibroComponent } from '../libro/libro.component';
import { Libro } from '../../../interfaces/libro';
import { LibroService } from '../../../services/libro.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [SharedModule, LibroComponent],
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.scss'],
})
export class FavoritosComponent implements OnInit, OnDestroy {
  suscripcionBorrado!: Subscription;
  librosFavoritos: Libro[] = [];

  constructor(
    private libroService: LibroService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.suscripcionBorrado = this.libroService
      .recuperarFavoritos()
      .subscribe((librosRecuperados: Libro[]) => {
        this.librosFavoritos = librosRecuperados;
      });
  }

  ngOnDestroy(): void {
    if (this.suscripcionBorrado) {
      this.suscripcionBorrado.unsubscribe();
    }
  }

  removeFavorito(libro: Libro): void {
    this.libroService.removeFavorito(libro);
    this._snackBar.open('Libro eliminado de favoritos', 'Cerrar', {
      duration: 500,
    });
  }
}
