import { Component, OnInit } from '@angular/core';
import { Mascota } from 'src/app/interfaces/mascota';


const ELEMENT_DATA: Mascota[] = [
  { nombre: 'Ciro', edad:3, raza: 'Golden', color: 'Dorado', peso: 13 }
];

@Component({
  selector: 'app-listado-mascota',
  templateUrl: './listado-mascota.component.html',
  styleUrls: ['./listado-mascota.component.css']
})
export class ListadoMascotaComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'edad', 'raza', 'color', 'peso'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }

}
