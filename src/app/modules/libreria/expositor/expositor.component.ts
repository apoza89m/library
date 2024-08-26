import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { FavoritosComponent } from '../favoritos/favoritos.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Libro } from '../../../interfaces/libro';
import { LibroService } from '../../../services/libro.service';
import { LibroComponent } from '../libro/libro.component';

@Component({
  selector: 'app-expositor',
  standalone: true,
  imports: [SharedModule, LibroComponent, FavoritosComponent],
  templateUrl: './expositor.component.html',
  styleUrl: './expositor.component.scss',
})
export class ExpositorComponent {
  suscripcionBorrado!: Subscription;
  suscripcionBorradoF!: Subscription;

  columnas: string[] = ['Titulo', 'Autor', 'Páginas', 'Genero', 'Año', 'ISBN'];
  modelos: string[] = ['title', 'name', 'pages', 'genre', 'year', 'ISBN'];

  libros!: Libro[];
  librosComprados: Libro[] = [];
  librosFavoritos: Libro[] = [];

  constructor(
    private libroService: LibroService,
    private _snackBar: MatSnackBar
  ) {
    console.log(this.libroService.miLibroFavorito);
    this.libroService.miLibroFavorito = 'Otro libro favorito';
    this.libroService.tituloWeb.next('Expositor de libros');
  }

  modoElegido: string = 'Compra';

  ngOnInit(): void {
    this.suscripcionBorrado = this.libroService
      .recuperarLibros()
      .subscribe((librosRecuperados) => {
        this.libros = librosRecuperados;
      });
    this.suscripcionBorradoF = this.libroService
      .recuperarFavoritos()
      .subscribe((librosRecuperados) => {
        this.librosFavoritos = librosRecuperados;
      });
  }

  /**
   * Cambia la variable modoElegido
   * @param nuevoModo Modo deseado
   */
  cambiarModo(nuevoModo: string): void {
    this.modoElegido = nuevoModo;
  }

  borraCookie(): void {
    this.libroService.borraCookie();
  }

  libroCompradoRecibido(libroComprado: Libro) {
    this._snackBar.open('Comprado: ' + libroComprado.title, 'Cerrar', {
      duration: 3000,
    });
    this.librosComprados.push(libroComprado);
    this.carrito.cantidadLibros++;
  }

  carrito: { cantidadLibros: number } = {
    cantidadLibros: 0,
  };

  vaciarCarrito() {
    this.librosComprados = [];
    this.carrito.cantidadLibros = 0;
  }

  ngOnDestroy(): void {
    this.suscripcionBorrado.unsubscribe();
    this.suscripcionBorradoF.unsubscribe();
  }
}
