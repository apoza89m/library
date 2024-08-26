import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Libro } from '../../../interfaces/libro';
import { LibroService } from '../../../services/libro.service';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-creacion',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './creacion.component.html',
  styleUrl: './creacion.component.scss',
})
export class CreacionComponent {
  router = inject(Router);
  constructor(
    private libroService: LibroService,
    private _snackBar: MatSnackBar
  ) {
    this.libroService.tituloWeb.next('Nuevo libro');
    console.log(this.libroService.miLibroFavorito);
  }

  formularioCreacion!: FormGroup;

  ngOnInit(): void {
    this.formularioCreacion = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      pages: new FormControl(null, [Validators.required]),
      genre: new FormControl(null, [Validators.required]),
      cover: new FormControl(null, []),
      synopsis: new FormControl(null, [Validators.required]),
      year: new FormControl(null, [Validators.required]),
      ISBN: new FormControl(null, [Validators.required]),
      author: new FormControl(null, []),
    });
  }
  registraLibro() {
    if (this.formularioCreacion.valid) {
      const valorTitulo: string = this.formularioCreacion.get('title')?.value;
      const valorPaginas: number = this.formularioCreacion.get('pages')?.value;
      const valorGenero: string = this.formularioCreacion.get('genre')?.value;
      const valorCover: string = this.formularioCreacion.get('cover')?.value;
      const valorSynopsis: string =
        this.formularioCreacion.get('synopsis')?.value;
      const valorYear: number = this.formularioCreacion.get('year')?.value;
      const valorISBN: string = this.formularioCreacion.get('ISBN')?.value;
      const autorNombre = this.formularioCreacion.get('author')?.value;

      const nuevoLibro: Libro = {
        title: valorTitulo,
        pages: valorPaginas,
        genre: valorGenero,
        cover: valorCover,
        synopsis: valorSynopsis,
        year: valorYear,
        ISBN: valorISBN,
        author: {
          name: autorNombre,
          otherBooks: [],
        },
      };

      this.libroService.getLibros().subscribe((libros) => {
        const autorExistente = libros.find(
          (libro) => libro.author.name === autorNombre
        );

        //actualizar la lista de otros libros del autor
        if (autorExistente) {
          this.libroService.updateOtherBooks(
            autorNombre,
            this.formularioCreacion.get('title')?.value
          );
        }

        //añadir el nuevo libro con el autor
        this.libroService.addLibro(nuevoLibro).subscribe({
          next: (addedLibro) => {
            console.log('Libro added:', addedLibro);
            this.router.navigate(['libro/expositor']);
          },
          error: (err) => {
            console.error('Error adding libro:', err);
          },
          complete: () => {
            this._snackBar.open('Libro creado.', 'Cerrar', {
              duration: 3000,
            });
          },
        });
      });
    } else {
      this._snackBar.open('Datos incorrectos', 'Cerrar', {
        duration: 3000,
      });
    }
  }
}
