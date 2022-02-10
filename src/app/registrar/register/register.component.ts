import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor() {}

  progreso: number = 20;

  mail: string = '';

  img: string = '../../assets/avatar.jpg';
  username: string = '';

  name: string = '';
  cognom: string = '';

  password: string = '';
  repassword: string = '';

  centro: string = '';
  fecha: string = '';

  alumno: boolean = false;
  message: string = '';
  displays: string[] = [' ', 'none', 'none', 'none','none'];

  next() {
    if ( this.displays[ 0 ] == ' ' )
    {
      if ( this.comprobarEmail() )
      {
        this.progreso = 40;
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
        this.progreso = 60;
        this.displays[1] = 'none';
        this.displays[2] = ' ';
      } else
      {
        swal.fire( this.message );
      }
      
    } else if ( this.displays[ 2 ] == ' ' )
    {
      if (this.comprobarPassword())
      {
        this.progreso = 80;
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
        this.progreso = 90;
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
