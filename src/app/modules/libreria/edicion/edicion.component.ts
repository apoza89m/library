import { Component, Inject } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Libro } from '../../../interfaces/libro';
import { LibroService } from '../../../services/libro.service';

@Component({
  selector: 'app-edicion',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './edicion.component.html',
  styleUrl: './edicion.component.scss',
})
export class EdicionComponent {
  libro!: Libro;
  formularioEdicion!: FormGroup;

  ngOnInit(): void {
    this.formularioEdicion = new FormGroup({
      title: new FormControl(this.libro.title, []),
      pages: new FormControl(this.libro.pages, []),
      genre: new FormControl(this.libro.genre, []),
      cover: new FormControl(this.libro.cover, []),
      synopsis: new FormControl(this.libro.synopsis, []),
      year: new FormControl(this.libro.year, []),
      ISBN: new FormControl(this.libro.ISBN, []),
    });
  }

  constructor(
    public dialogRef: MatDialogRef<EdicionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private libroService: LibroService
  ) {
    console.log(data);
    this.libro = data.libro;
  }

  onSiClick(): void {
    if (this.formularioEdicion.valid) {
      this.libroService
        .updateLibro(this.libro, this.formularioEdicion.value)
        .subscribe((libroPersistido: Libro) => {
          this.libro = libroPersistido;
        });
      this.dialogRef.close(this.libro);
    } else {
      console.error('Form is invalid');
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
