import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private sanitizer: DomSanitizer) {}

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

  inputIMG: HTMLElement = document.getElementById( 'inputIMG' ) as HTMLElement; 

  alumno: boolean = false;
  message: string = '';
  displays: string[] = [ ' ', 'none', 'none', 'none', 'none' ];

  next() {
    if ( this.displays[ 0 ] == ' ' )
    {
      if ( this.comprobarEmail() )
      {
        this.progreso = 25;
        this.displays[0] = 'none';
        this.displays[1] = ' ';
      } else
      {
        swal.fire( this.message );
      }
    } else if ( this.displays[ 1 ] == ' ' )
    {
      if ( this.comprobarUsername() )
      {
        if ( this.img = "../../assets/avatar.jpg" )
        {
            swal.fire({
            title: 'Estas seguro que no quieres subir una foto de perfil?',
            text: "Para subir una foto de perfil, haz click sobre el icono de usuario.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar'
          }).then((result) => {
            if (result.isConfirmed) {
              this.progreso = 50;
              this.displays[1] = 'none';
              this.displays[2] = ' ';
            }
          })
          
        } 
        
      } else 
      {
        swal.fire( this.message );
      } 
      
    } else if ( this.displays[ 2 ] == ' ' )
    {
      if (this.comprobarPassword())
      {
        this.progreso = 75;
        this.displays[3] = ' ';
        this.displays[2] = 'none';
      } else
      {
        swal.fire( this.message );
      }
      
    } else if ( this.displays[ 3 ] == ' ' )
    {
      if ( this.name == '' )
      {
        swal.fire( 'Introducir Nombre!' );
      } else if ( this.cognom == '' )
      {
        swal.fire( 'Introducir Apellido!' );
      } else
      {
        this.progreso = 100;
        this.displays[4] = ' ';
        this.displays[3] = 'none';
      }
    }
    else if ( this.displays[ 4 ] == ' ' )
    {
      if ( this.alumno&&this.centro == '' )
      {
        swal.fire( 'Introducir nombre del centro!' );
      } else if ( !this.alumno&&this.fecha == '' )
      {
        swal.fire( 'Introducir fecha de nacimiento!' );
      } else
      {
        this.registrarUsuario();
        this.progreso = 100;
        this.displays[0] = '';
        this.displays[4] = 'none';
      }
      
    }
  }

  imgClick ()
  {
    this.inputIMG = document.getElementById( 'inputIMG' ) as HTMLElement; 
    this.inputIMG.click();
  }

  capturarFile(event:any): any {
    const archivoCapturado = event.target.files[ 0 ];
    this.extraerBase64(archivoCapturado).then((imagen: any) => {
      this.img = imagen.base;
    })
  }

  extraerBase64 = async ($event: any) => new Promise((resolve, reject):any => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };

    } catch (e) {
      return null;
    }
  })

  registrarUsuario ()
  {
    swal.fire('Usuario registrado!')
  }

  selectType ()
  {
    if ( this.alumno )
    {
      this.alumno = false;
    } else
    {
      this.alumno = true;
    }
  }

  comprobarUsername ()
  {
    if ( this.username == '' )
    {
      this.message='Introducir username!'
      return false;
    } else 
      {
      
    }
    return true;
  }

  comprobarPassword ()
  {
    if ( this.password == '' )
    {
      this.message = "Debe introducir el password!";
      return false;
      
    } else if ( this.repassword =='')
      {
        this.message = "Debe confirmar el password!";
        return false;
      }
    else if(this.password==this.repassword)
    {
      return true;
    } else
    {
      this.message = "El Password no coincide!";
        return false;
    }
  }

  comprobarEmail ()
  {
    if ( this.mail == '' )
    {
      this.message='Introducir Email!'
      return false;
    } else
    {
      for (let index = 0; index < this.mail.length; index++) {
      const element = this.mail[ index ];
      if (element=='@')
      {
        return true;
      }
    }
    }
    this.message='Email no valido!'
    return false;
  }

  ngOnInit(): void {}
}
