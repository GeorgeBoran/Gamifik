import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Route, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RakingService } from '../services/raking.service';
import { UsersService } from '../services/users.service';
import { user } from '../user';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css'],
})
export class PerfilUsuarioComponent implements OnInit {
  verify: boolean = false;
  account: user | any = {};
  localUsername: string = '';
  rankingSelected: string | null | undefined;
  addUserData: { rankingName: string | null | undefined; username: string } = {
    rankingName: '',
    username: '',
  };

  inputIMG: HTMLElement = document.getElementById('inputIMG') as HTMLElement;

  constructor(
    private sanitizer: DomSanitizer,
    private router: Router,
    private Service: UsersService,
    private Sranking: RakingService
  ) {}

  deleteUser() {
    if (this.rankingSelected == null) {
      Swal.fire('No Ranking Selected!');
    } else {
      new Promise(async (resolve, reject) => {
        const { value: userName } = await Swal.fire({
          title: 'Delete user',
          input: 'text',
          inputLabel: 'Intorduce el nombre del usuario que quieras eliminar.',
          inputPlaceholder: 'Username',
          showCancelButton: true,
        });
        if (userName) {
          this.addUserData = {
            rankingName: this.rankingSelected,
            username: userName,
          };
          this.Sranking.deleteUser(this.addUserData).subscribe((datos: any) => {
            if (datos == 'Correcto!') {
              Swal.fire('Usuario eliminado del Ranking!');
            } else if (datos == 'Usuario creador!') {
              Swal.fire('No se puede eliminar al usuario creador!');
            } else if (datos == 'Usuario no registrado!') {
              Swal.fire({
                title: 'Usuario no encontrado !',
                confirmButtonText: 'Ok',
              }).then((result) => {
                if (result.isConfirmed) {
                  this.deleteUser();
                }
              });
            }
          });
          Swal.fire('Usuario eliminado!');
        }
      });
    }
  }

  editRanking() {
    if (this.rankingSelected == null) {
      Swal.fire('No Ranking Selected!');
    } else {
      new Promise(async (resolve, reject) => {
        const { value: rankingName } = await Swal.fire({
          title: 'Enter new ranking name',
          input: 'text',
          inputLabel: 'Intorduce el nombre nuevo del ranking.',
          inputPlaceholder: 'Ranking name',
          showCancelButton: true,
        });
        if (rankingName) {
          Swal.fire('Ranking Name!');
        }
      });
    }
  }

  deleteRanking() {
    Swal.fire({
      title: 'Seguro que quieres eliminar el Ranking?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Borrar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.Sranking.deleteRanking(this.rankingSelected).subscribe(
          (datos: any) => {
            if (datos == 'Ranking eliminado!') {
              Swal.fire('Ranking Eliminado!', '', 'success');
            }
          }
        );
      }
    });
  }

  selectRanking(ranking: string | null | undefined) {
    this.rankingSelected = ranking;
  }

  addUser() {
    if (this.rankingSelected == null) {
      Swal.fire('No Ranking Selected!');
    } else {
      new Promise(async (resolve, reject) => {
        const { value: userName } = await Swal.fire({
          title: 'Add new user',
          input: 'text',
          inputLabel: 'Intorduce el nombre del usuario que quieras agregar.',
          inputPlaceholder: 'Username',
          showCancelButton: true,
        });
        if (userName) {
          this.addUserData = {
            rankingName: this.rankingSelected,
            username: userName,
          };
          this.Sranking.addUserRanking(this.addUserData).subscribe(
            (datos: any) => {
              if (datos == 'Correcto!') {
                Swal.fire('Usuario agregado!');
              } else if (datos == 'User no valido!') {
                Swal.fire({
                  title: 'Uusario no encontrado!',
                  confirmButtonText: 'Ok',
                }).then((result) => {
                  if (result.isConfirmed) {
                    this.addUser();
                  }
                });
              } else if ('Usuario ya registrado!') {
                Swal.fire({
                  title: 'Uusario ya registrado!',
                  confirmButtonText: 'Ok',
                }).then((result) => {
                  if (result.isConfirmed) {
                    this.addUser();
                  }
                });
              } else {
                Swal.fire('Error al agregar Usuario!');
              }
            }
          );
          Swal.fire('Uusario agregado!');
        }
      });
    }
  }

  async editFecha() {
    const { value: date } = await Swal.fire({
      title: 'New Date',
      html: '<input id="swal-input1" class="swal2-input" type="date" placeholder="Enter your new password">',
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        return [
          (<HTMLInputElement>document.getElementById('swal-input1')).value,
        ];
      },
    });
    if (date) {
      this.account.option = date[0];
      this.edit();
    }
  }

  editCenter() {
    return new Promise(async (resolve, reject) => {
      const { value: center } = await Swal.fire({
        title: 'Enter new email',
        input: 'text',
        inputLabel: 'Intorduce el nuevo mail.',
        inputPlaceholder: 'Enter your new email',
        showCancelButton: true,
      });
      if (center) {
        this.account.option = center;
        this.edit();
      }
    });
  }

  editMail() {
    return new Promise(async (resolve, reject) => {
      const { value: mail } = await Swal.fire({
        title: 'Enter new email',
        input: 'text',
        inputLabel: 'Intorduce el nuevo mail.',
        inputPlaceholder: 'Enter your new email',
        showCancelButton: true,
      });
      if (mail) {
        var validation: boolean = false;
        for (let index = 0; index < mail.length; index++) {
          const element = mail[index];
          if (element == '@') {
            validation = true;
          }
        }
        if (validation) {
          this.account.mail = mail;
          this.edit();
        } else {
          Swal.fire({
            title: 'Email no valido!',
            confirmButtonText: 'Ok',
          }).then((result) => {
            if (result.isConfirmed) {
              this.editMail();
            }
          });
        }
      }
    });
  }

  editCognom() {
    return new Promise(async (resolve, reject) => {
      const { value: subname } = await Swal.fire({
        title: 'Enter new lastname',
        input: 'text',
        inputLabel: 'Intorduce el nuevo apellido.',
        inputPlaceholder: 'Enter your new lastname',
        showCancelButton: true,
      });
      if (subname) {
        this.account.cognom = subname;
        this.edit();
      }
    });
  }

  editName() {
    return new Promise(async (resolve, reject) => {
      const { value: name } = await Swal.fire({
        title: 'Enter new name',
        input: 'text',
        inputLabel: 'Intorduce el nuevo nombre.',
        inputPlaceholder: 'Enter your new name',
        showCancelButton: true,
      });
      if (name) {
        this.account.name = name;
        this.edit();
      }
    });
  }

  editUsername() {
    return new Promise(async (resolve, reject) => {
      const { value: name } = await Swal.fire({
        title: 'Enter new userame',
        input: 'text',
        inputLabel: 'Intorduce el nuevo nombre de usuario.',
        inputPlaceholder: 'Enter your new username',
        showCancelButton: true,
      });
      if (name) {
        this.Service.comprobarUser(name).subscribe((datos: any) => {
          if (datos == 'user no valido') {
            Swal.fire({
              title: 'Nombre de usuario no valido!',
              confirmButtonText: 'Ok',
            }).then((result) => {
              if (result.isConfirmed) {
                this.editUsername();
              }
            });
          } else {
            this.account.username = name;
            this.edit();
          }
        });
      }
    });
  }

  async editAccount(boolean: boolean) {
    if (boolean) {
      this.edit();
    } else {
      if (await this.enterPassword(2)) {
        this.edit();
      }
    }
  }

  edit() {
    this.Service.editAccount(this.account).subscribe({
      next: (datos: any) => {
        if (datos == 'Edit correcto') {
          localStorage.setItem('user-logged', JSON.stringify(this.account));
          Swal.fire('Datos de Usuario actualizados!');
        } else {
          Swal.fire('Error al editar los datos!');
        }
      },
      error: () => {
        Swal.fire('Error de base datos!');
      },
    });
  }

  imgClick() {
    this.inputIMG = document.getElementById('inputIMG') as HTMLElement;
    this.inputIMG.click();
  }

  async capturarFile(event: any): Promise<any> {
    const archivoCapturado = event.target.files[0];
    await this.extraerBase64(archivoCapturado).then(async (imagen: any) => {
      this.account.img = imagen.base;
      this.editAccount(false);
    });
  }

  extraerBase64 = async ($event: any) =>
    new Promise((resolve, reject): any => {
      try {
        const unsafeImg = window.URL.createObjectURL($event);
        const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
        const reader = new FileReader();
        reader.readAsDataURL($event);
        reader.onload = () => {
          resolve({
            base: reader.result,
          });
        };
        reader.onerror = (error) => {
          resolve({
            base: null,
          });
        };
      } catch (e) {
        return null;
      }
    });

  async enterPassword(option: number) {
    return new Promise(async (resolve, reject) => {
      const { value: password } = await Swal.fire({
        title: 'Enter your password',
        input: 'password',
        inputLabel: 'Intorduce tu password actual.',
        inputPlaceholder: 'Enter your password',
        showCancelButton: true,
      });

      if (password) {
        this.Service.login(this.account.username, password).subscribe(
          async (datos: any) => {
            if (datos == 'pwd incorrecto') {
              await Swal.fire({
                title: 'Password incorrecto!',
                confirmButtonText: 'Ok',
              }).then((result) => {
                if (result.isConfirmed) {
                  if (option == 1) {
                    this.changePassword();
                  } else if (option == 2) {
                    this.editAccount(false);
                  }
                }
              });
            } else if (datos == 'pwd correcto') {
              resolve(true);
            }
          }
        );
      }
    });
  }

  async changePassword() {
    if (await this.enterPassword(1)) {
      const { value: formValues } = await Swal.fire({
        title: 'New Password',
        html:
          '<input id="swal-input1" class="swal2-input" type="password" placeholder="Enter your new password">' +
          '<input id="swal-input2" class="swal2-input " type="password" placeholder="Enter your new password">',
        focusConfirm: false,
        preConfirm: () => {
          return [
            (<HTMLInputElement>document.getElementById('swal-input1')).value,
            (<HTMLInputElement>document.getElementById('swal-input2')).value,
          ];
        },
      });
      if (formValues) {
        if (JSON.stringify(formValues[0]) != JSON.stringify(formValues[1])) {
          await Swal.fire({
            title: 'El password no coincide!',
            confirmButtonText: 'Ok',
          }).then((result) => {
            if (result.isConfirmed) {
              this.changePassword();
            }
          });
        } else {
          this.account.password = formValues[0];
          if (this.account.password != '' && this.account.password != ' ') {
            this.editAccount(true);
          } else {
            Swal.fire({
              title: 'El password no puede estar vació!',
              confirmButtonText: 'Ok',
            }).then((result) => {
              if (result.isConfirmed) {
                this.changePassword();
              }
            });
          }
        }
      }
    }
  }

  ngOnInit(): void {
    localStorage.removeItem('rankingSelected');
    if (localStorage.getItem('user-logged')) {
      this.account = localStorage.getItem('user-logged');
      this.account = JSON.parse(this.account);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
