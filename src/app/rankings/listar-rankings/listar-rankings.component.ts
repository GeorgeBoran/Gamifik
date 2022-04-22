import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-rankings',
  templateUrl: './listar-rankings.component.html',
  styleUrls: ['./listar-rankings.component.css'],
})
export class ListarRankingsComponent implements OnInit {
  @Input() rankingSelected: number | null | undefined;
  rankings: { nombre: string; fecha: string; select: string }[] = [];
  @Output() newSelect: EventEmitter<number | null> = new EventEmitter();
  @Input() tipoAccount: any;

  constructor(private router: Router) {
    for (let index = 0; index < 9; index++) {
      this.rankings.push({
        nombre: 'Ranking ' + (index + 1) + '',
        fecha: '20/12/2022',
        select: '',
      });
    }
    console.log(this.rankings);
  }

  selectRanking(id: number) {
    if (this.tipoAccount) {
      this.router.navigate(['/ranking']);
    } else {
      if (this.rankingSelected == id) {
        this.router.navigate(['/ranking']);
      } else {
        if (this.rankingSelected != null) {
          this.rankings[this.rankingSelected].select = '';
        }
        this.rankings[id].select = 'background-color:#85858580;';
        this.rankingSelected = id;
      }
    }
    console.log(this.rankingSelected);
    this.newSelect.emit(this.rankingSelected);
  }

  ngOnInit(): void {}
}
