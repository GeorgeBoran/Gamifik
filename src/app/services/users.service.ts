import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user } from '../user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  URL = 'http://localhost/Gamifica/Gamifik-master/src/app/API/';    
  constructor ( private http: HttpClient ) { }
  
comprobarUser(username:string) {
  return this.http.get(`${this.URL}comprobarUsername.php?username=${username}`);
}

  registrarUsuario(User:user)
  {
    console.log(  JSON.stringify( User ) );
    return this.http.post( `${ this.URL }registrarUser.php`, JSON.stringify( User ) );
  }
  
  
}
