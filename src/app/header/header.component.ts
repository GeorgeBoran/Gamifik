import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  deslogueo() {
    Swal.fire({
      title: 'Deseas cerrar sesion?',
      icon: 'warning',
      iconColor: 'rgb(197, 16, 16)',
      showCancelButton: true,
      cancelButtonColor: 'red',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Confirmar',
    }).then((result) => {
      if (result.isConfirmed) {
        /*CODIGO PARA DESLOGUEAR*/

        this.router.navigate(['/login']);
      }
    });
  }
}
