import { Component, Input, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';

  mostrarContra: boolean = false;
  eye: string|any = 'fa-eye';

  //Funcion para mostrar contrasena:
  mostrarContrasena() {
    this.mostrarContra = !this.mostrarContra;
    if ( this.eye == 'fa-eye' )
    {
      this.eye = 'fa-eye-slash';
    } else
    {
      this.eye = 'fa-eye';
    }
  }

  loguear() {
    if (this.username == '') {
      Swal.fire('Introducir username!');
    } else if (this.password == '') {
      Swal.fire('Introducir password!');
    } else {
      if (this.comprobarUsername()) {
        if (this.comprobarPassword()) {
          Swal.fire('Usuario logueado!');
        } else {
          Swal.fire('Password incorrecto!');
        }
      } else {
        Swal.fire('Username no encontrado!');
      }
    }
  }

  comprobarPassword() {
    return true;
  }

  comprobarUsername() {
    return true;
  }

  constructor() {}

  ngOnInit(): void {}
}
