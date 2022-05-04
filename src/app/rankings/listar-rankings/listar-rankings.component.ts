import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RakingService } from 'src/app/services/raking.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-rankings',
  templateUrl: './listar-rankings.component.html',
  styleUrls: ['./listar-rankings.component.css'],
})
export class ListarRankingsComponent implements OnInit {
  rankingSelected: number | null | undefined;
  rankings: { nombre: string; fecha: string; select: string }[] = [];
  dataNewRanking: { rankingName: string; idUser: string } = {
    rankingName: '',
    idUser: '',
  };
  @Input() idUser!: string;

  @Output() newSelect: EventEmitter<string | null> = new EventEmitter();
  @Input() tipoAccount: any;

  constructor(private router: Router, private Sranking: RakingService) {}

  addRanking() {
    new Promise(async (resolve, reject) => {
      const { value: rankingName } = await Swal.fire({
        title: 'Enter new Ranking',
        input: 'text',
        inputLabel: 'Intorduce el nombre del nuevo ranking.',
        inputPlaceholder: 'Ranking name',
        showCancelButton: true,
      });
      if (rankingName) {
        Swal.fire('Ranking Name!');
        this.dataNewRanking = {
          rankingName: rankingName,
          idUser: this.idUser,
        };
        this.Sranking.crearRanking(this.dataNewRanking).subscribe(
          (datos: any) => {
            if (datos == 'Creacion correcta') {
              Swal.fire('Ranking creado!');
              window.location.reload();
            } else {
              Swal.fire('Error al crear Ranking!');
            }
          }
        );
      }
    });
  }

  selectRanking(id: number) {
    if (this.tipoAccount) {
      this.newSelect.emit(this.rankings[id].nombre);
      localStorage.setItem('rankingSelected', this.rankings[id].nombre);
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

  ngOnInit(): void {
    this.Sranking.listarRanking().subscribe((datos: any) => {
      for (let index = 0; index < datos.length; index++) {
        this.rankings.push({
          nombre: datos[index][1],
          fecha: datos[index][2],
          select: '',
        });
      }
    });
  }
}
