import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RakingService } from 'src/app/services/raking.service';

@Component({
  selector: 'app-listar-rankings',
  templateUrl: './listar-rankings.component.html',
  styleUrls: ['./listar-rankings.component.css'],
})
export class ListarRankingsComponent implements OnInit {
  rankingSelected: number | null | undefined;
  rankings: { nombre: string; fecha: string; select: string }[] = [];

  @Output() newSelect: EventEmitter<string | null> = new EventEmitter();
  @Input() tipoAccount: any;

  constructor(private router: Router, private Sranking: RakingService) {
    this.Sranking.listarRanking().subscribe((datos: any) => {
      for (let index = 0; index < datos.length; index++) {
        this.rankings.push({
          nombre: datos[index][1],
          fecha: datos[index][2],
          select: '',
        });
      }
    });
    console.log(this.rankings);
  }

  selectRanking(id: number) {
    if (this.tipoAccount) {
      this.router.navigate(['/ranking']);
    } else {
      if (this.rankingSelected == id) {
        localStorage.setItem('rankingSelected', this.rankings[id].nombre);
        this.router.navigate(['/ranking']);
      } else {
        if (this.rankingSelected != null) {
          this.rankings[this.rankingSelected].select = '';
        }
        this.rankings[id].select = 'background-color:#85858580;';
        this.rankingSelected = id;
      }
    }
    this.newSelect.emit(this.rankings[id].nombre);
  }

  ngOnInit(): void {}
}
