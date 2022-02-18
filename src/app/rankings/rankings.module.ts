import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarRankingsComponent } from './listar-rankings/listar-rankings.component';

@NgModule({
  declarations: [ListarRankingsComponent],
  exports: [ListarRankingsComponent],
  imports: [CommonModule],
})
export class RankingsModule {}
