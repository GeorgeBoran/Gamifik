import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ventana-formulario',
  templateUrl: './ventana-formulario.component.html',
  styleUrls: ['./ventana-formulario.component.css'],
})
export class VentanaFormularioComponent implements OnInit {
  progreso: number = 20;

  constructor() {}

  ngOnInit(): void {}
}
