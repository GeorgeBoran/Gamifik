import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RakingService } from 'src/app/services/raking.service';
import { user } from 'src/app/user';
import Swal from 'sweetalert2';
import { SoftSkills } from 'src/app/skills';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-visualizar-ranking',
  templateUrl: './visualizar-ranking.component.html',
  styleUrls: ['./visualizar-ranking.component.css'],
})
export class VisualizarRankingComponent implements OnInit {
  edit: boolean = false;
  account: user | any = {};
  rankingName: any = '';
  users: {
    userid: number;
    puntuacion: number;
    img: string;
    username: string;
  }[] = [];



  skillID:any = 0;
  skillName:any = '';
  submitted:boolean = false;

   atributosSkill:
    | {
        skillName: string;
        imgSkill: string;
        descSkill: string;
      }
    | any;


  constructor(private router: Router, private Sranking: RakingService) {}

  setPoints(user: number) {
    new Promise(async (resolve, reject) => {
      const { value: points } = await Swal.fire({
        title: 'Set Points',
        input: 'number',
        inputLabel: 'Intorduce los puntos para este usuario.',
        inputPlaceholder: 'Points',
        showCancelButton: true,
      });
      if (points) {
        this.Sranking.setPoints(this.rankingName, user, points).subscribe(
          (datos: any) => {
            if (datos == 'Correcto!') {
              Swal.fire({
                title: 'Set Points!',
                showDenyButton: false,
                showCancelButton: false,
                confirmButtonText: 'OK',
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.reload();
                }
              });
            } else {
              Swal.fire('Error!');
            }
          }
        );
      }
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem('rankingSelected')) {
      this.rankingName = localStorage.getItem('rankingSelected');
    } else {
      this.router.navigate(['/pagina']);
    }

    this.account = localStorage.getItem('user-logged');
    this.account = JSON.parse(this.account);

    this.Sranking.adminRanking(this.rankingName, this.account.id).subscribe(
      (datos: any) => {
        if (datos == 'Admin') {
          this.edit = true;
        } else {
          this.edit = false;
        }
        console.log(
          'Ranking:' +
            this.rankingName +
            ' User-ID:' +
            this.account.id +
            ' Admin:' +
            this.edit
        );
      }

    );

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


  mostrarMenu: boolean = false;
  cancel: boolean = false;
  mostrarPopup() {
    if (this.mostrarMenu == false) {
      this.mostrarMenu = true;
    }
  }

  cerrarMenu() {
    if (this.mostrarMenu == true) {
      this.mostrarMenu = false;
    }
  }



  softSkills(skill: number) {
    //Se inicializa el objeto popupDatos
    this.atributosSkill = {
      skillName: '',
      imgSkill: '',
      descSkill: '',
    };

    if (skill == 1) {
      this.atributosSkill.skillName = 'Responsabilidad';
      this.atributosSkill.imgSkill = './assets/responsabilidad.webp';
      this.atributosSkill.descSkill =
        'Habilidad de lograr con calidad las tareas asignadas, en el lugar y el momento adecuados, con el objetivo de responder a nuestros compromisos y respetando las normas acordadas.';
    } else if (skill == 2) {
      this.atributosSkill.skillName = 'Cooperación';
      this.atributosSkill.imgSkill = './assets/cooperacion.webp';
      this.atributosSkill.descSkill =
        'Habilidad de interaccionar de forma constructiva y a partir de la escucha, con el objetivo de conseguir una meta común y consensuada.';
    } else if (skill == 3) {
      this.atributosSkill.skillName = 'Autonomía e Iniciativa';
      this.atributosSkill.imgSkill = './assets/autonomia.webp';
      this.atributosSkill.descSkill =
        'Habilidad de emprender acciones e implicarse en las actividades, utilizando los recursos propios, y de saber cuándo pedir ayuda.';
    } else if (skill == 4) {
      this.atributosSkill.skillName = 'Gestión Emocional';
      this.atributosSkill.imgSkill = './assets/gestionemocional.webp';
      this.atributosSkill.descSkill =
        'Habilidad de percibir y aceptar las emociones propias y las de los demás, con el objetivo de desarrollar estrategias de gestión personal eficaces.';
    } else if (skill == 5) {
      this.atributosSkill.skillName = 'Habilidades de pensamiento';
      this.atributosSkill.imgSkill = './assets/pensamiento.webp';
      this.atributosSkill.descSkill =
        'Habilidad de relacionar, cuestionar, generar y exponer ideas.';
    }

  }


  setSkill1(user:number){
    new Promise(async (resolve, reject) => {
      const { value: skills } = await Swal.fire({
        icon: 'warning',
        title: 'Estas seguro, una vez otorgada la medalla no se podra revertir?',
        showConfirmButton: true,
        showDenyButton: true,
      });
      if (skills) {
        this.Sranking.setResponsabilidad(this.rankingName, user, skills).subscribe(
          (datos: any) => {
            if (datos == 'Correcto!') {
              Swal.fire({
                title: 'Se le ha otorgado la medalla al alumno!',
                showDenyButton: false,
                showCancelButton: false,
                confirmButtonText: 'OK',
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.reload();
                }
              });
            } else {
              Swal.fire('Error!');
            }
          }
        );
      }
    });
  }

  setSkill2(user:number){
    new Promise(async (resolve, reject) => {
      const { value: skills } = await Swal.fire({
        icon: 'warning',
        title: 'Estas seguro, una vez otorgada la medalla no se podra revertir?',
        showConfirmButton: true,
        showDenyButton: true,
      });
      if (skills) {
        this.Sranking.setCooperacion(this.rankingName, user, skills).subscribe(
          (datos: any) => {
            if (datos == 'Correcto!') {
              Swal.fire({
                title: 'Se le ha otorgado la medalla al alumno!',
                showDenyButton: false,
                showCancelButton: false,
                confirmButtonText: 'OK',
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.reload();
                }
              });
            } else {
              Swal.fire('Error!');
            }
          }
        );
      }
    });
  }

  setSkill3(user:number){
    new Promise(async (resolve, reject) => {
      const { value: skills } = await Swal.fire({
        icon: 'warning',
        title: 'Estas seguro, una vez otorgada la medalla no se podra revertir?',
        showConfirmButton: true,
        showDenyButton: true,
      });
      if (skills) {
        this.Sranking.setAutonomia(this.rankingName, user, skills).subscribe(
          (datos: any) => {
            if (datos == 'Correcto!') {
              Swal.fire({
                title: 'Se le ha otorgado la medalla al alumno!',
                showDenyButton: false,
                showCancelButton: false,
                confirmButtonText: 'OK',
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.reload();
                }
              });
            } else {
              Swal.fire('Error!');
            }
          }
        );
      }
    });
  }


  setSkill4(user:number){
    new Promise(async (resolve, reject) => {
      const { value: skills } = await Swal.fire({
        icon: 'warning',
        title: 'Estas seguro, una vez otorgada la medalla no se podra revertir?',
        showConfirmButton: true,
        showDenyButton: true,
      });
      if (skills) {
        this.Sranking.setEmocional(this.rankingName, user, skills).subscribe(
          (datos: any) => {
            if (datos == 'Correcto!') {
              Swal.fire({
                title: 'Se le ha otorgado la medalla al alumno!',
                showDenyButton: false,
                showCancelButton: false,
                confirmButtonText: 'OK',
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.reload();
                }
              });
            } else {
              Swal.fire('Error!');
            }
          }
        );
      }
    });
  }

  setSkill5(user:number){
    new Promise(async (resolve, reject) => {
      const { value: skills } = await Swal.fire({
        icon: 'warning',
        title: 'Estas seguro, una vez otorgada la medalla no se podra revertir?',
        showConfirmButton: true,
        showDenyButton: true,
      });
      if (skills) {
        this.Sranking.setPensamiento(this.rankingName, user, skills).subscribe(
          (datos: any) => {
            if (datos == 'Correcto!') {
              Swal.fire({
                title: 'Se le ha otorgado la medalla al alumno!',
                showDenyButton: false,
                showCancelButton: false,
                confirmButtonText: 'OK',
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.reload();
                }
              });
            } else {
              Swal.fire('Error!');
            }
          }
        );
      }
    });
  }



}
