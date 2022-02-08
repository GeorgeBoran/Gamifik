import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor () { }

  progreso: number = 50;
  
  mail: string = '';
  img: string = '';
  username: string = '';
  name: string = '';
  cognom: string = '';
  password: string = '';
  repassword: string = '';
  centro: string = '';

  displays: string[] = [' ','none','none','none'];
  
 

  next ()
  {
    if ( this.displays[ 0 ] == ' ' )
    {
      
        this.displays[ 0 ] = 'none';
        this.displays[ 1 ] = ' ';
      
    } else if(this.displays[ 1 ] == ' ')
    {
      
        this.displays[ 1 ] = 'none';
        this.displays[ 2 ] = ' ';
      
    }else if(this.displays[ 2 ] == ' ')
    {
      this.displays[ 3 ] = '';
      this.displays[ 2 ] = 'none';
    }else if(this.displays[ 3 ] == ' ')
    {
      this.displays[ 0 ] = '';
      this.displays[ 3 ] = 'none';
    }
    
  }

  ngOnInit(): void {}
}
