import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarRankingsComponent } from './listar-rankings/listar-rankings.component';
import { VisualizarRankingComponent } from './visualizar-ranking/visualizar-ranking.component';

@NgModule({
  declarations: [ListarRankingsComponent, VisualizarRankingComponent],
  exports: [ListarRankingsComponent],
  imports: [CommonModule],
})
export class RankingsModule {}
