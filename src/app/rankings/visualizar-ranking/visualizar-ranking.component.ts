import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RakingService } from 'src/app/services/raking.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-visualizar-ranking',
  templateUrl: './visualizar-ranking.component.html',
  styleUrls: ['./visualizar-ranking.component.css'],
})
export class VisualizarRankingComponent implements OnInit {
  rankingName: any = '';
  users: {
    userid: number;
    puntuacion: number;
    img: string;
    username: string;
  }[] = [];

  constructor(private router: Router, private Sranking: RakingService) {}

  ngOnInit(): void {
    if (localStorage.getItem('rankingSelected')) {
      this.rankingName = localStorage.getItem('rankingSelected');
    } else {
      this.router.navigate(['/pagina']);
    }

    this.Sranking.usersRanking(this.rankingName).subscribe((datos: any) => {
      if (datos == 'Vacio!') {
        Swal.fire('Ranking Vacio!');
        this.router.navigate(['/pagina']);
      } else {
        for (let index = 0; index < datos.length; index++) {
          this.users.push({
            userid: datos[index][0],
            puntuacion: datos[index][1],
            img: '',
            username: '',
          });
          this.Sranking.downloadUser(datos[index][0]).subscribe(
            (datos: any) => {
              this.users[index].username = datos[0][0];
              this.users[index].img = datos[0][1];
            }
          );
        }
      }
    });
  }

  volverTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
