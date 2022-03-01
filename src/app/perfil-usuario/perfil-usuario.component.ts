import { Component, OnInit } from '@angular/core';
import { user } from '../user';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css'],
})
export class PerfilUsuarioComponent implements OnInit
{
  
  account: user|any = {};

  constructor() {}

  ngOnInit (): void
  {
    this.account = localStorage.getItem( 'user-logged' );
    this.account = JSON.parse( this.account );
    console.log( this.account );
  }
}
