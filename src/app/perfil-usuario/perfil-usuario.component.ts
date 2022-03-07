import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsersService } from '../services/users.service';
import { user } from '../user';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css'],
})
export class PerfilUsuarioComponent implements OnInit
{
  confirmPassword: string|undefined[]=[];
  account: user|any = {};

  constructor ( private router: Router, private Service: UsersService ) { }

  
 async changePassword ()
 {
   
       const { value: password } = await Swal.fire({
  title: 'Enter your password',
  input: 'password',
  inputLabel: 'Intorduce tu password actual.',
  inputPlaceholder: 'Enter your password',
  showCancelButton: true,
       } )
   if (password) {
        this.Service.login(this.account.username,password).subscribe(
              async ( datos: any ) =>
              {
                if(datos=='pwd incorrecto')
                {
                    Swal.fire({
                    title: 'Password incorrecto!',
                    confirmButtonText: 'Ok',
                  }).then((result) => {
                    if (result.isConfirmed) {
                      this.changePassword();
                    } 
                  })
                } else if ( datos == 'pwd correcto' )
                {
                  Swal.fire( 'Password Correcto!' );
                  const {value: formValues} = await Swal.fire({
                  title: 'New Password',
                  html:
                    '<input id="swal-input1" class="swal2-input" type="password" placeholder="Enter your new password">' +
                    '<input id="swal-input2" class="swal2-input " type="password" placeholder="Enter your new password">',
                  focusConfirm: false,
                  preConfirm: () => {
                    return [
                      (<HTMLInputElement>document.getElementById('swal-input1')).value,
                      (<HTMLInputElement>document.getElementById('swal-input2')).value
                    ]
                  }
                  } )
                  
                 
                  if ( formValues )
                  {
                    if ( JSON.stringify( formValues[ 0 ] ) != JSON.stringify( formValues[ 1 ] ) )
                    {
                      await Swal.fire( 'El password no coincide!' );
                      this.changePassword();
                    } else
                    {
                      Swal.fire( 'Password actulizado!' );
                    }
                    
                    
                    
                  }
                }
              }
            );
    }
  }

  ngOnInit (): void
  {
    if ( localStorage.getItem( 'user-logged' ) )
    {
    this.account = localStorage.getItem( 'user-logged' );
    this.account = JSON.parse( this.account );
    console.log( this.account );
    }else{
      this.router.navigate(['/login']);
    }
    
  }
}
