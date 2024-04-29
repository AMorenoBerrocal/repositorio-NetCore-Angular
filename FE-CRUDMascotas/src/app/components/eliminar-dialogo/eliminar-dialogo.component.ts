import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-eliminar-dialogo',
  templateUrl: './eliminar-dialogo.component.html',
  styleUrls: ['./eliminar-dialogo.component.css']
})
export class EliminarDialogoComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
