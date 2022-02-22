import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { profe } from './profe';
import { alumno } from './alumno';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  URL = '/api/';


constructor(private http: HttpClient) { }


loginAlumno(datosUsuario:alumno) {
  return this.http.get(`${this.URL}seleccionardatosAlumno.php?nickname=${datosUsuario["username"]}
                                                             ?password=${datosUsuario["password"]}`);
}

loginProfesor(datosUsuario:profe) {
  return this.http.get(`${this.URL}seleccionardatosProfesor.php?nickname=${datosUsuario["username"]}
                                                               ?password=${datosUsuario["password"]}`);
}

registerAlumno(registrarUsuario:alumno) {
  return this.http.post(`${this.URL}registrarAlumno.php?email=${registrarUsuario["mail"]}
                                                       ?img=${registrarUsuario["img"]}
                                                       ?nickname=${registrarUsuario["username"]}
                                                       ?nombre=${registrarUsuario["name"]}
                                                       ?apellido=${registrarUsuario["cognom"]}
                                                       ?password=${registrarUsuario["password"]}
                                                       ?fecha_nacimiento=${registrarUsuario["fecha"]}
                                                       `, JSON.stringify(registrarUsuario));
}

registerProfesor(registrarUsuario:profe) {
  return this.http.get(`${this.URL}registrarProfesor.php?email=${registrarUsuario["mail"]}
                                                        ?img=${registrarUsuario["img"]}
                                                        ?nickname=${registrarUsuario["username"]}
                                                        ?nombre=${registrarUsuario["name"]}
                                                        ?apellido=${registrarUsuario["cognom"]}
                                                        ?password=${registrarUsuario["password"]}
                                                        ?fecha_nacimiento=${registrarUsuario["centro"]}
                                                       `);
}

comprobarAlumno(comprobarUsuario:alumno) {
  return this.http.get(`${this.URL}comprobarUsuario.php?comprobarUsuario=${comprobarUsuario}`);
}

comprobarProfesor(comprobarUsuario:profe) {
  return this.http.get(`${this.URL}comprobarUsuario.php?comprobarUsuario=${comprobarUsuario}`);
}

}
