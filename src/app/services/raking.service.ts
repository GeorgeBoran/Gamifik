import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RakingService {
  URL = 'http://localhost/Gamifica/Gamifik-master/src/app/API/';
  constructor(private http: HttpClient) {}

  comprobarRanking(rankingName: string) {
    return this.http.get(
      `${this.URL}comprobarRanking.php?rankingName=${rankingName}`
    );
  }

  usersRanking(rankingName: string) {
    return this.http.get(
      `${this.URL}usersRanking.php?rankingName=${rankingName}`
    );
  }
  downloadUser(id: number) {
    return this.http.get(`${this.URL}downloadUserInfo.php?idUser=${id}`);
  }

  public crearRanking(datos: { rankingName: string; idUser: string }) {
    return this.http.post(`${this.URL}crearRanking.php`, JSON.stringify(datos));
  }

  public listarRanking() {
    return this.http.get(`${this.URL}listarRankings.php`);
  }

  public addUserRanking(datos: {
    rankingName: string | null | undefined;
    username: string;
  }) {
    return this.http.post(`${this.URL}addUsers.php`, JSON.stringify(datos));
  }
}
