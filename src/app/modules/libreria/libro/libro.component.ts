import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { Libro } from '../../../interfaces/libro';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LibroService } from '../../../services/libro.service';
import { EdicionComponent } from '../edicion/edicion.component';

@Component({
  selector: 'app-libro',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './libro.component.html',
  styleUrl: './libro.component.scss',
})
export class LibroComponent {
  @Input()
  libro!: Libro;
  @Input()
  modoElegido!: string;

  @Output() notificacionCompra: EventEmitter<Libro> = new EventEmitter();

  constructor(
    private libroService: LibroService,
    public dialogEditar: MatDialog
  ) {}

  ngOnInit(): void {
    console.log(this.libro);
  }

  comprar() {
    this.notificacionCompra.emit(this.libro);
  }

  @Output() libroFavorito = new EventEmitter<Libro>();

  addToFavorites(): void {
    this.libroService.addFavorito(this.libro);
  }

  removeFromFavorites(): void {
    this.libroService.removeFavorito(this.libro);
  }

  borrar() {
    this.libroService.deleteLibro(this.libro).subscribe((resultado) => {
      console.log(resultado);
    });
  }

  editar() {
    const configDialog: MatDialogConfig = {
      data: {
        libro: this.libro,
      },
    };
    const dialogRef = this.dialogEditar.open(EdicionComponent, configDialog);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.libro = result;
        console.log(`Dialog result: ${result}`);
      }
    });
  }
}
