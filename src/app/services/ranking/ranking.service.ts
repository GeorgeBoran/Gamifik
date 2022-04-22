import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Ranking } from 'src/app/interfaces/ranking';
import { user } from 'src/app/user';


@Injectable({
  providedIn: 'root'
})
export class RankingService {
  URL = 'http://localhost:8080/';

  constructor(private http: HttpClient) {}

  addRanking(Ranking:Ranking){
    return this.http.post(`${ this.URL }addRanking.php`, JSON.stringify(Ranking));
  }

  getStudents(username:string){
    return this.http.get(`${this.URL}getUsers.php?username=${username}`);
  }

  addStudents(username:user){
    return this.http.post(`${this.URL}addUsers.php?`, JSON.stringify(username));
  }


}
