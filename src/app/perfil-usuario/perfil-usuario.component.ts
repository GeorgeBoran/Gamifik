import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { user } from '../user';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css'],
})
export class PerfilUsuarioComponent implements OnInit
{
  
  account: user|any = {};

  constructor(private router:Router) {}

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
