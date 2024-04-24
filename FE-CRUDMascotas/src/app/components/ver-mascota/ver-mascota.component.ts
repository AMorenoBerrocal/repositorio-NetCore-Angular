import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Mascota } from 'src/app/interfaces/mascota';
import { MascotaService } from 'src/app/services/mascota.service';

@Component({
  selector: 'app-ver-mascota',
  templateUrl: './ver-mascota.component.html',
  styleUrls: ['./ver-mascota.component.css']
})
export class VerMascotaComponent implements OnInit, OnDestroy {
  id!: number;
  mascota!: Mascota;
  loading: boolean = false;

  routeSub!: Subscription;

  // mascota$!: Observable<Mascota>   PIP Async

  constructor(private _mascotaService:MascotaService, 
    private aRoute: ActivatedRoute) {
      // Obtenemos el id de la mascota: opcion para obtener el id por ruta
      // Problema: casos de uso donde no se actualice correctamente
      this.id = parseInt(this.aRoute.snapshot.paramMap.get('id')!);
  }

  ngOnInit(): void {
    // this.mascota$ = this._mascotaService.getMascota(this.id); // PIP Async
    // Ruteo:
    /*this.routeSub = this.aRoute.params.subscribe(data => {
      this.id = data['id'];
      this.obtenerMascota();
    })*/
    this.obtenerMascota();
  }

  ngOnDestroy(): void {
    /*this.routeSub.unsubscribe();*/
  }

  obtenerMascota() {
    this.loading=true;
    this._mascotaService.getMascota(this.id).subscribe( data => {
        this.mascota = data;
        this.loading =false; 
      }
    )
  }

}
