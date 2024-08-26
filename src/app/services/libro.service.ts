import { isPlatformBrowser } from '@angular/common';
import {
  Inject,
  Injectable,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, BehaviorSubject } from 'rxjs';
import { Libro } from '../interfaces/libro';
import { library } from '../../../public/books.json';

@Injectable({
  providedIn: 'root',
})
export class LibroService implements OnInit, OnDestroy {
  private librosBaseDatos: Libro[] = [];
  private defaultLibros: Libro[] = [];
  private librosFavoritos: Libro[] = [];
  private librosFavoritosSubject = new BehaviorSubject<Libro[]>(
    this.librosFavoritos
  );

  miLibroFavorito: string = 'Ejemplo de libro favorito';

  constructor(
    private _snackBar: MatSnackBar,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.initializeDefaultLibros();
    this.loadLibrosFromStorage();
    this.loadFavoritosFromStorage();
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  borraCookie(): void {
    localStorage.removeItem('misLibros');
    localStorage.removeItem('misFavoritos');
    this.loadLibrosFromStorage();
    window.location.reload();
    this._snackBar.open('Cookie borrada', 'Cerrar', {
      duration: 3000,
    });
  }

  private initializeDefaultLibros(): void {
    this.defaultLibros = library.map((item) => item.book);
  }

  private loadLibrosFromStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      const librosCookie = localStorage.getItem('misLibros');
      if (librosCookie) {
        try {
          this.librosBaseDatos = JSON.parse(librosCookie);
          if (!Array.isArray(this.librosBaseDatos)) {
            throw new Error('Parsed data is not an array');
          }
          console.log('Libros loaded from localStorage:', this.librosBaseDatos);
        } catch (e) {
          console.error(
            'Error parsing libros from localStorage or data is not an array:',
            e
          );
        }
      } else {
        this.librosBaseDatos = this.defaultLibros;
        localStorage.setItem('misLibros', JSON.stringify(this.defaultLibros));
      }
    }
  }

  private loadFavoritosFromStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      const favoritosCookie = localStorage.getItem('misFavoritos');
      if (favoritosCookie) {
        try {
          this.librosFavoritos = JSON.parse(favoritosCookie);
          if (!Array.isArray(this.librosFavoritos)) {
            throw new Error('Parsed data is not an array');
          }
          this.librosFavoritosSubject.next(this.librosFavoritos);
        } catch (e) {
          console.error('Error parsing favoritos from localStorage:', e);
        }
      }
    }
  }

  private saveFavoritosToStorage(): void {
    localStorage.setItem('misFavoritos', JSON.stringify(this.librosFavoritos));
  }

  recuperarLibros(): Observable<Libro[]> {
    return new Observable((observer) => {
      setTimeout(() => {
        observer.next(this.librosBaseDatos);
        observer.complete();
      }, 1000);
    });
  }

  addLibro(libro: Libro): Observable<Libro> {
    return new Observable((observer) => {
      setTimeout(() => {
        this.librosBaseDatos.push(libro);
        localStorage.setItem('misLibros', JSON.stringify(this.librosBaseDatos));
        observer.next(libro);
        observer.complete();
      }, 500);
    });
  }

  updateLibro(libroOriginal: Libro, libroModificado: Libro): Observable<Libro> {
    return new Observable((observer) => {
      setTimeout(() => {
        const indiceLibroModificar: number =
          this.librosBaseDatos.indexOf(libroOriginal);
        libroModificado.author =
          this.librosBaseDatos[indiceLibroModificar].author;
        this.librosBaseDatos[indiceLibroModificar] = libroModificado;
        localStorage.setItem('misLibros', JSON.stringify(this.librosBaseDatos));
        observer.next(libroModificado);
        observer.complete();
      }, 500);
    });
  }

  deleteLibro(libro: Libro): Observable<boolean> {
    return new Observable((observer) => {
      setTimeout(() => {
        const indice: number = this.librosBaseDatos.indexOf(libro);
        if (indice !== -1) {
          this.librosBaseDatos.splice(indice, 1); //(posicion, cantidad elementos)
          localStorage.setItem(
            'misLibros',
            JSON.stringify(this.librosBaseDatos)
          );
          this._snackBar.open('Libro borrado', 'Cerrar', {
            duration: 3000,
          });
          observer.next(true);
        } else {
          this._snackBar.open('Libro no encontrado', 'Cerrar', {
            duration: 3000,
          });
          observer.next(false);
        }
        observer.complete();
      }, 500);
    });
  }

  tituloWeb: BehaviorSubject<string> = new BehaviorSubject('Libreria');

  recuperaInfoExtra(titulo: string): string {
    const libroEncontrado: Libro | undefined = this.librosBaseDatos.find(
      (libro) => libro.title === titulo
    );
    if (libroEncontrado) {
      return `<p>${libroEncontrado.synopsis}</p>`;
    } else {
      return '<p>No se encontró información adicional.</p>';
    }
  }

  //--FAVORITOS--//

  recuperarFavoritos(): Observable<Libro[]> {
    return this.librosFavoritosSubject.asObservable();
  }

  addFavorito(libro: Libro) {
    if (!this.librosFavoritos.includes(libro)) {
      this.librosFavoritos.push(libro);
      this.librosFavoritosSubject.next(this.librosFavoritos);
      this.saveFavoritosToStorage(); // Guardar favoritos en localStorage
    }
  }

  removeFavorito(libro: Libro) {
    this.librosFavoritos = this.librosFavoritos.filter((l) => l !== libro);
    this.librosFavoritosSubject.next(this.librosFavoritos);
    this.saveFavoritosToStorage(); // Guardar favoritos en localStorage
  }

  //-AUTHOR-//

  getLibros(): Observable<Libro[]> {
    return new Observable((observer) => {
      setTimeout(() => {
        observer.next(this.librosBaseDatos);
        observer.complete();
      }, 1000);
    });
  }

  private saveLibros(): void {
    localStorage.setItem('misLibros', JSON.stringify(this.librosBaseDatos));
  }

  // Buscar un libro por el nombre del autor
  findLibroByAuthorName(authorName: string): Libro | undefined {
    return this.librosBaseDatos.find(
      (libro) => libro.author.name === authorName
    );
  }

  // Actualizar el array `otherBooks` de un autor
  updateOtherBooks(authorName: string, bookTitle: string): Observable<void> {
    return new Observable((observer) => {
      setTimeout(() => {
        const libro = this.findLibroByAuthorName(authorName);
        if (libro) {
          libro.author.otherBooks.push(bookTitle);
          this.saveLibros();
          observer.next();
        } else {
          observer.error('Autor no encontrado');
        }
        observer.complete();
      }, 500);
    });
  }
}
