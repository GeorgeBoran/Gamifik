import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}


  deslogueo(){
      Swal.fire({
          title: 'Deseas cerrar sesion?',
          text: 'Si es asi confirma, de otro modo pulsa cancelar.',
          icon: 'warning',
          iconColor:'rgb(197, 16, 16)',
          showCancelButton: true,
          cancelButtonColor: 'red',
          cancelButtonText:'Cancelar',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Confirmar',
        })
        .then((result) => {
          if (result.isConfirmed) {

            /*CODIGO PARA DESLOGUEAR*/

          }
        });
}
}
