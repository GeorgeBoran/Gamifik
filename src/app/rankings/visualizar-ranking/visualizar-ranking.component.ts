import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-visualizar-ranking',
  templateUrl: './visualizar-ranking.component.html',
  styleUrls: ['./visualizar-ranking.component.css'],
})
export class VisualizarRankingComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  volverTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
