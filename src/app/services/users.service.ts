import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user } from '../user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  URL = 'http://localhost/Gamifica/Gamifik-master/src/app/API/';
  constructor(private http: HttpClient) {}

  comprobarUser(username: string) {
    return this.http.get(
      `${this.URL}comprobarUsername.php?username=${username}`
    );
  }

  login(username: string, pwd: string) {
    return this.http.get(
      `${this.URL}comprobarUsername.php?username=${username}&pwd=${pwd}`
    );
  }

  registrarUsuario(User: user) {
    return this.http.post(`${this.URL}registrarUser.php`, JSON.stringify(User));
  }

  downloadUser(username: string, pwd: string) {
    return this.http.get(
      `${this.URL}downloadUser.php?username=${username}&pwd=${pwd}`
    );
  }

  editAccount(User: user) {
    return this.http.post(`${this.URL}editAccount.php`, JSON.stringify(User));
  }
}
