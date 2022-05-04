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

  editRankingName(
    oldRankingName: string | null | undefined,
    newRankingName: string
  ) {
    return this.http.get(
      `${this.URL}editRankingName.php?oldName=${oldRankingName}&newName=${newRankingName}`
    );
  }

  downloadUser(id: number) {
    return this.http.get(`${this.URL}downloadUserInfo.php?idUser=${id}`);
  }

  deleteRanking(rankingName: string | null | undefined) {
    return this.http.get(
      `${this.URL}deleteRanking.php?rankingName=${rankingName}`
    );
  }

  adminRanking(rankingName: string | null | undefined, user: string) {
    return this.http.get(
      `${this.URL}adminRanking.php?rankingName=${rankingName}&user=${user}`
    );
  }

  setPoints(
    rankingName: string | null | undefined,
    user: number,
    points: number
  ) {
    return this.http.get(
      `${this.URL}setPointsRanking.php?rankingName=${rankingName}&user=${user}&points=${points}`
    );
  }

  public crearRanking(datos: { rankingName: string; idUser: string }) {
    return this.http.post(`${this.URL}crearRanking.php`, JSON.stringify(datos));
  }

  public deleteUser(datos: {
    rankingName: string | null | undefined;
    username: string;
  }) {
    return this.http.post(
      `${this.URL}deleteUserRanking.php`,
      JSON.stringify(datos)
    );
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
