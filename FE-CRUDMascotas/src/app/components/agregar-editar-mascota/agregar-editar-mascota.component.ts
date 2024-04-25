import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Mascota } from 'src/app/interfaces/mascota';
import { MascotaService } from 'src/app/services/mascota.service';

@Component({
  selector: 'app-agregar-editar-mascota',
  templateUrl: './agregar-editar-mascota.component.html',
  styleUrls: ['./agregar-editar-mascota.component.css']
})
export class AgregarEditarMascotaComponent implements OnInit {

  loading: boolean;
  form: FormGroup;
  id: number;
  operacion:string = 'Agregar';

  constructor(private fb: FormBuilder,
    private _mascotaService: MascotaService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private aRoute: ActivatedRoute) { 
    this.loading = false;
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      raza: ['', Validators.required],
      color: ['', Validators.required],
      edad: ['', Validators.required],
      peso: ['', Validators.required]
    })
    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));

  }

  ngOnInit(): void {
    if(this.id!=0){
      this.operacion = 'Editar';
      this.obtenerMascota(this.id);
    }
  }

  obtenerMascota(id : number) {
    this.loading = true;
    this._mascotaService.getMascota(id).subscribe(data => {
      this.form.setValue({          // Si solo queremos pasarle ciertos valores: patchValue
        nombre: data.nombre,
        raza: data.raza,
        color: data.color,
        edad: data.edad,
        peso: data.peso
      })
      this.loading = false;
    }
    )
  }

  agregarEditarMascota(){
    //const nombre = this.form.get('nombre')?.value;
    // Creamos el objeto
    const mascota: Mascota = {
      nombre: this.form.value.nombre,
      raza: this.form.value.raza,
      color: this.form.value.color,
      edad: this.form.value.edad,
      peso: this.form.value.peso
    }
    if(this.id!=0){
      mascota.id = this.id;
      this.editarMascota(this.id, mascota);
    } else {
      this.agregarMascota(mascota);
    }
  }

  editarMascota(id:number, mascota:Mascota){
    this.loading = true;
    this._mascotaService.updateMascota(id, mascota).subscribe( data => {
      this.loading = false;
      this.mensajeExito('editada');
      this.router.navigate(['/listMascotas']);
    })
  }

  agregarMascota(mascota:Mascota){
    // Enviamos el objeto al backend
    this._mascotaService.addMascota(mascota).subscribe(data => {
      this.mensajeExito('creada');
      this.router.navigate(['/listMascotas']);
    })
  }

  mensajeExito(text:string) 
  {
    this._snackBar.open("La mascota fue " + text + " con exito", '', {
      duration: 4000,
      horizontalPosition: 'right'
    });
  }

}
