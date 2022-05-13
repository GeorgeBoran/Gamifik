import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SoftSkills } from '../skills';

@Injectable({
  providedIn: 'root',
})
export class RakingService {
  URL = 'http://localhost/';
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
  public getSkills(skillID:number, skillName:string){
    return this.http.get(`${this.URL}getSkills.php?skillID=${skillID}skillName=${skillName}`, {responseType: 'text'});
  }



  public setResponsabilidad(rankingName: string | null | undefined, user: number, responsabilidad:number){
    return this.http.get(`${this.URL}setSkill1.php?rankingName=${rankingName}&user=${user}&responsabilidad=${responsabilidad}`);
  }

  public setCooperacion(rankingName: string | null | undefined, user: number, cooperacion:number){
    return this.http.get(`${this.URL}setSkill2.php?rankingName=${rankingName}&user=${user}&cooperacion=${cooperacion}`);
  }

  public setAutonomia(rankingName: string | null | undefined, user: number, autonomia:number){
    return this.http.get(`${this.URL}setSkill3.php?rankingName=${rankingName}&user=${user}&autonomia_iniciativa=${autonomia}`);
  }

  public setEmocional(rankingName: string | null | undefined, user: number, gestion_emocional:number){
    return this.http.get(`${this.URL}setSkill4.php?rankingName=${rankingName}&user=${user}&gestion_emocional=${gestion_emocional}`);
  }

  public setPensamiento(rankingName: string | null | undefined, user: number, habilidad_pensamiento:number){
    return this.http.get(`${this.URL}setSkill5.php?rankingName=${rankingName}&user=${user}&habilidad_pensamiento=${habilidad_pensamiento}`);
  }
}
