import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LibroService } from '../../../services/libro.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  token: string | null = sessionStorage.getItem('token');

  // !: asignacion definitiva
  sesionIniciada!: boolean;
  formularioLogin!: FormGroup;

  constructor(private router: Router, private libroService: LibroService) {
    this.libroService.tituloWeb.next('Login');
  }

  ngOnInit(): void {
    this.sesionIniciada = this.token !== null;
    this.formularioLogin = new FormGroup({
      email: new FormControl('a@a.com', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('1234_@abcd', [Validators.required]),
    });
    //this.formularioLogin.markAllAsTouched;
  }

  iniciaSesion() {
    if (this.formularioLogin.valid) {
      const valorEmail: string = this.formularioLogin.get('email')?.value;
      const valorPassword: string = this.formularioLogin.value.password;

      if (valorEmail === 'a@a.com' && valorPassword === '1234_@abcd') {
        sessionStorage.setItem('token', '1');
        this.sesionIniciada = true;
        this.router.navigate(['/libro/creacion']);
      } else {
        alert('Datos incorrectos');
      }
    }
  }

  cierraSesion() {
    sessionStorage.removeItem('token');
    this.sesionIniciada = false;
  }
}
