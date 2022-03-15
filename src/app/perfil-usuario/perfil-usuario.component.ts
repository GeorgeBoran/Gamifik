import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Route, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsersService } from '../services/users.service';
import { user } from '../user';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css'],
})
export class PerfilUsuarioComponent implements OnInit {
<<<<<<< HEAD
  verify: boolean = false;
  account: user | any = {};
  inputIMG: HTMLElement = document.getElementById('inputIMG') as HTMLElement;

  constructor(
    private sanitizer: DomSanitizer,
    private router: Router,
    private Service: UsersService
  ) {}

  editName() {
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
                }
              });
              resolve(false);
            } else if (datos == 'pwd correcto') {
              this.account.password = password;
              resolve(true);
            }
          }
        );
      } else {
      }
    });
  }

  async editAccount(boolean: boolean) {
    console.log('Account a setear: ' + this.account);

    if (boolean) {
      this.edit();
    } else {
      if (await this.enterPassword(2)) {
        this.edit();
      }
    }
    window.location.reload();
  }

  edit() {
    this.Service.editAccount(this.account).subscribe({
      next: (datos: any) => {
        if (datos == 'Edit correcto') {
          this.account.password = '';
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
              resolve(false);
            } else if (datos == 'pwd correcto') {
              this.account.password = password;
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
      console.log(formValues);
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
=======
  confirmPassword: string | undefined[] = [];
  account: user | any = {};

  constructor(private router: Router, private Service: UsersService) {}

  async changePassword() {
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
            Swal.fire({
              title: 'Password incorrecto!',
>>>>>>> 02ca982678847fb6a3cb8824ea97b196fc4f379a
              confirmButtonText: 'Ok',
            }).then((result) => {
              if (result.isConfirmed) {
                this.changePassword();
              }
            });
<<<<<<< HEAD
          }
        }
      }
=======
          } else if (datos == 'pwd correcto') {
            Swal.fire('Password Correcto!');
            const { value: formValues } = await Swal.fire({
              title: 'New Password',
              html:
                '<input id="swal-input1" class="swal2-input" type="password" placeholder="Enter your new password">' +
                '<input id="swal-input2" class="swal2-input " type="password" placeholder="Enter your new password">',
              focusConfirm: false,
              preConfirm: () => {
                return [
                  (<HTMLInputElement>document.getElementById('swal-input1'))
                    .value,
                  (<HTMLInputElement>document.getElementById('swal-input2'))
                    .value,
                ];
              },
            });

            if (formValues) {
              if (
                JSON.stringify(formValues[0]) != JSON.stringify(formValues[1])
              ) {
                await Swal.fire('El password no coincide!');
                this.changePassword();
              } else {
                Swal.fire('Password actulizado!');
              }
            }
          }
        }
      );
>>>>>>> 02ca982678847fb6a3cb8824ea97b196fc4f379a
    }
  }

  ngOnInit(): void {
    if (localStorage.getItem('user-logged')) {
      this.account = localStorage.getItem('user-logged');
      this.account = JSON.parse(this.account);
      console.log(this.account);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
