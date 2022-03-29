import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { user } from 'src/app/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';

  account: user | any = {};

  mostrarContra: boolean = false;
  eye: string | any = 'fa-eye';

  //Funcion para mostrar contrasena:
  mostrarContrasena() {
    this.mostrarContra = !this.mostrarContra;
    if (this.eye == 'fa-eye') {
      this.eye = 'fa-eye-slash';
    } else {
      this.eye = 'fa-eye';
    }
  }

  loguear() {
    if (this.username == '') {
      Swal.fire('Introducir nombre de usuario!');
    } else if (this.password == '') {
      Swal.fire('Introducir password!');
    } else if (this.login()) {
    }
  }

  login() {
    this.Service.login(this.username, this.password).subscribe((datos: any) => {
      console.log(datos);
      if (datos == 'user no registrado') {
        Swal.fire('Usuario no registrado!');
      } else if (datos == 'pwd incorrecto') {
        Swal.fire('Password incorrecto!');
      } else if (datos == 'pwd correcto') {
        this.Service.downloadUser(this.username, this.password).subscribe(
          (datos: any) => {
            console.log(datos);
            this.account = {
              mail: datos[0][1],
              username: datos[0][2],
              name: datos[0][3],
              cognom: datos[0][4],
              password: datos[0][5],
              option: datos[0][6],
              tipo: datos[0][7],
              img: datos[0][8],
              id: datos[0][0],
            };
            console.log(this.account);
            localStorage.setItem('user-logged', JSON.stringify(this.account));
            this.router.navigate(['/pagina']);
          }
        );
      }
    });
    return true;
  }

  constructor(private router: Router, private Service: UsersService) {}

  ngOnInit(): void {
    if (localStorage.getItem('user-logged')) {
      this.router.navigate(['/pagina']);
    }
  }
}
