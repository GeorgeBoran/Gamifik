import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarRankingsComponent } from './listar-rankings/listar-rankings.component';
import { VisualizarRankingComponent } from './visualizar-ranking/visualizar-ranking.component';
import { CompartidoModule } from '../compartido/compartido.module';
@NgModule({
  declarations: [ListarRankingsComponent, VisualizarRankingComponent],
  exports: [ListarRankingsComponent],
  imports: [CommonModule, CompartidoModule],
})
export class RankingsModule {}
