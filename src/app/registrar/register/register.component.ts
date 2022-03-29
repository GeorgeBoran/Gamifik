import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { UsersService } from 'src/app/services/users.service';
import { sequence } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { user } from 'src/app/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private sanitizer: DomSanitizer,
    private router: Router,
    private Service: UsersService
  ) {}

  progreso: number = 0;

  mail: string = '';

  img: string = '../../assets/avatar.jpg';
  username: string = '';

  name: string = '';
  cognom: string = '';

  password: string = '';
  repassword: string = '';

  centro: string = '';
  fecha: string = '';
  option: string = '';

  inputIMG: HTMLElement = document.getElementById('inputIMG') as HTMLElement;

  alumno: boolean = true;
  OK: boolean = true;
  displays: string[] = [' ', 'none', 'none', 'none', 'none'];

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

  next() {
    if (this.displays[0] == ' ') {
      if (this.comprobarEmail()) {
        this.progreso = 20;
        this.displays[0] = 'none';
        this.displays[1] = ' ';
      }
    } else if (this.displays[1] == ' ') {
      if (this.comprobarUsername()) {
        if (this.img == '../../assets/avatar.jpg') {
          swal
            .fire({
              title: 'Estas seguro que no quieres subir una foto de perfil?',
              text: 'Para subir una foto de perfil, haz click sobre el icono de usuario.',
              icon: 'warning',
              showCancelButton: true,
              cancelButtonColor: '#d33',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Confirmar',
            })
            .then((result) => {
              if (result.isConfirmed) {
                this.progreso = 50;
                this.displays[1] = 'none';
                this.displays[2] = ' ';
              }
            });
        } else {
          this.progreso = 40;
          this.displays[1] = 'none';
          this.displays[2] = ' ';
        }
      }
    } else if (this.displays[2] == ' ') {
      if (this.comprobarPassword()) {
        this.progreso = 60;
        this.displays[3] = ' ';
        this.displays[2] = 'none';
      }
    } else if (this.displays[3] == ' ') {
      if (this.name == '') {
        swal.fire('Introducir Nombre!');
      } else if (this.cognom == '') {
        swal.fire('Introducir Apellido!');
      } else {
        this.progreso = 80;
        this.displays[4] = ' ';
        this.displays[3] = 'none';
      }
    } else if (this.displays[4] == ' ') {
      if (this.alumno && this.fecha == '') {
        swal.fire('Introducir fecha de nacimiento!');
      } else if (!this.alumno && this.centro == '') {
        swal.fire('Introducir nombre del centro!');
      } else {
        this.progreso = 100;
        this.registrarUsuario();
      }
    }
  }

  imgClick() {
    this.inputIMG = document.getElementById('inputIMG') as HTMLElement;
    this.inputIMG.click();
  }

  capturarFile(event: any): any {
    const archivoCapturado = event.target.files[0];
    this.extraerBase64(archivoCapturado).then((imagen: any) => {
      this.img = imagen.base;
    });
  }

  extraerBase64 = async ($event: any) =>
    new Promise((resolve, reject): any => {
      try {
        const unsafeImg = window.URL.createObjectURL($event);
        const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
        const reader = new FileReader();
        reader.readAsDataURL($event);
        reader.onload = () => {
          resolve({
            base: reader.result,
          });
        };
        reader.onerror = (error) => {
          resolve({
            base: null,
          });
        };
      } catch (e) {
        return null;
      }
    });

  back() {
    if (this.displays[1] == ' ') {
      this.displays[0] = ' ';
      this.displays[1] = 'none';
    } else if (this.displays[2] == ' ') {
      this.displays[1] = ' ';
      this.displays[2] = 'none';
    } else if (this.displays[3] == ' ') {
      this.displays[2] = ' ';
      this.displays[3] = 'none';
    } else if (this.displays[4] == ' ') {
      this.displays[3] = ' ';
      this.displays[4] = 'none';
    }
  }
  registrarUsuario() {
    if (this.alumno) {
      this.option = this.fecha;
    } else {
      this.option = this.centro;
    }
    var user: user = {
      mail: this.mail,
      username: this.username,
      name: this.name,
      cognom: this.cognom,
      password: this.password,
      option: this.option,
      tipo: this.alumno,
      img: this.img,
      id: 0,
    };
    this.Service.registrarUsuario(user).subscribe((datos: any) => {
      console.log(datos);
      if (datos == 'Registro correcto') {
        swal
          .fire({
            title: 'Usuario registrado!',
            icon: 'warning',
            showCancelButton: false,
            cancelButtonColor: '#d33',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
          })
          .then(async (result) => {
            if (result.isConfirmed) {
              await this.Service.downloadUser(
                user.username,
                user.password
              ).subscribe((datos: any) => {
                console.log('Datos: ', datos);
                user = {
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
                localStorage.setItem('user-logged', JSON.stringify(user));
                this.router.navigate(['/pagina']);
              });
            }
          });
      } else {
        swal.fire('Error. Usuario no registrado!');
      }
    });
  }

  selectType() {
    if (this.alumno) {
      this.alumno = false;
    } else {
      this.alumno = true;
    }
  }

  comprobarUsername() {
    this.OK = true;
    if (this.username == '') {
      swal.fire('Introducir username!');
      this.OK = false;
    } else {
      this.Service.comprobarUser(this.username).subscribe((datos: any) => {
        console.log(datos);
        if (datos == 'user no valido') {
          this.OK = false;
          this.displays[2] = 'none';
          this.displays[1] = ' ';
          swal.fire('Nombre de usuario no valido!');
        }
      });
    }
    return this.OK;
  }

  comprobarPassword() {
    if (this.password == '') {
      swal.fire('Debe introducir el password!');
      return false;
    } else if (this.repassword == '') {
      swal.fire('Debe confirmar el password!');
      return false;
    } else if (this.password == this.repassword) {
      return true;
    } else {
      swal.fire('El Password no coincide!');
      return false;
    }
  }

  comprobarEmail() {
    if (this.mail == '') {
      swal.fire('Introducir Email!');
      return false;
    } else {
      for (let index = 0; index < this.mail.length; index++) {
        const element = this.mail[index];
        if (element == '@') {
          return true;
        }
      }
    }
    swal.fire('Email no valido!');
    return false;
  }

  ngOnInit(): void {
    if (localStorage.getItem('user-logged')) {
      this.router.navigate(['/pagina']);
    }
  }
}
