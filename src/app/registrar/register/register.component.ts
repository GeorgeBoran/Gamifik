import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/usuario.service';
import { HttpClient } from '@angular/common/http';
import { profe } from '../.././profe';
import { alumno } from '../.././alumno';
import swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private sanitizer: DomSanitizer, private router: Router, private servicioUsuario: UsuarioService, private http: HttpClient) {}

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

  inputIMG: HTMLElement = document.getElementById('inputIMG') as HTMLElement;

  alumno: boolean = true;
  message: string = '';
  displays: string[] = [' ', 'none', 'none', 'none', 'none'];

  mostrarContra: boolean = false;

  usuario:alumno|any={
    mail: '',
    img: '../../assets/avatar.jpg',
    username:'',
    name: '',
    cognom: '',
    password: '',
    fecha: ''
  }

  //Funcion para mostrar contrasena:
  mostrarContrasena() {
    this.mostrarContra = !this.mostrarContra;
  }

  next() {
    if (this.displays[0] == ' ') {
      if (this.comprobarEmail()) {
        this.usuario = this.mail;//
        this.progreso = 20;
        this.displays[0] = 'none';
        this.displays[1] = ' ';
      } else {
        swal.fire(this.message);
      }
    } else if (this.displays[1] == ' ') {
      if (this.comprobarUsername()) {
        this.usuario = this.username; //
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
          this.usuario = this.img;
          this.progreso = 40;
          this.displays[1] = 'none';
          this.displays[2] = ' ';
        }
      } else {
        swal.fire(this.message);
      }
    } else if (this.displays[2] == ' ') {
      if (this.comprobarPassword()) {
        this.usuario = this.password;
        this.progreso = 60;
        this.displays[3] = ' ';
        this.displays[2] = 'none';
      } else {
        swal.fire(this.message);
      }
    } else if (this.displays[3] == ' ') {
      if (this.name == '') {
        swal.fire('Introducir Nombre!');
      } else if (this.cognom == '') {
        swal.fire('Introducir Apellido!');
      } else {
        this.usuario = this.name;//
        this.usuario = this.cognom;//
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
        this.mostrarRegistroUsuario();
        this.registrarUsuario("");
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

  mostrarRegistroUsuario() {
    swal
      .fire({
        title: 'Usuario registrado!',
        icon: 'warning',
        showCancelButton: false,
        cancelButtonColor: '#d33',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/pagina']);
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
    if (this.username == '') {
      this.message = 'Introducir username!';
      return false;
    } else {
      return true;
    }
  }

  comprobarPassword() {
    if (this.password == '') {
      this.message = 'Debe introducir el password!';
      return false;
    } else if (this.repassword == '') {
      this.message = 'Debe confirmar el password!';
      return false;
    } else if (this.password == this.repassword) {
      return true;
    } else {
      this.message = 'El Password no coincide!';
      return false;
    }
  }

  comprobarEmail() {
    if (this.mail == '') {
      this.message = 'Introducir Email!';
      return false;
    } else {
      for (let index = 0; index < this.mail.length; index++) {
        const element = this.mail[index];
        if (element == '@') {
          return true;
        }
      }
    }
    this.message = 'Email no valido!';
    return false;
  }

  ngOnInit(): void {}

  registrarUsuario(usureg:any){
    this.servicioUsuario.registerAlumno(this.usuario).subscribe(
      datos => this.usuario = datos
    );
    console.log("hola");
  }


}
