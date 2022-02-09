import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor() {}

  progreso: number = 50;

  mail: string = '';

  img: string = '';
  username: string = '';

  name: string = '';
  cognom: string = '';

  password: string = '';
  repassword: string = '';

  centro: string = '';
  fecha: string = '';
  condicion: boolean = false;

  message: string = '';

  displays: string[] = [' ', 'none', 'none', 'none','none'];

  next() {
    if ( this.displays[ 0 ] == ' ' )
    {
      if ( this.comprobarEmail() )
      {
        this.displays[0] = 'none';
        this.displays[1] = ' ';
      } else
      {
        swal.fire( 'Email no valido!' );
      }
    } else if ( this.displays[ 1 ] == ' ' )
    {
      if ( this.username == '' )
      {
        swal.fire( 'Username no valido!' );
      } else
      {
        this.displays[1] = 'none';
        this.displays[2] = ' ';
      }
      
    } else if ( this.displays[ 2 ] == ' ' )
    {
      if (this.comprobarPassword())
      {
        this.displays[3] = '';
        this.displays[2] = 'none';
      } else
      {
        swal.fire( this.message );
      }
      
    } else if (this.displays[3] == ' ') {
      this.displays[4] = '';
      this.displays[3] = 'none';
    }
    else if (this.displays[3] == ' ') {
      this.displays[0] = '';
      this.displays[4] = 'none';
    }
  }

  comprobarPassword ()
  {
    if ( this.password == " " )
    {
      this.message = "Debe introducir el password!";
      return false;
      
    } else if ( this.repassword ==" ")
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
   
    for (let index = 0; index < this.mail.length; index++) {
      const element = this.mail[ index ];
      if (element=='@')
      {
        return true;
      }
    }
    return false;
  }

  ngOnInit(): void {}
}
