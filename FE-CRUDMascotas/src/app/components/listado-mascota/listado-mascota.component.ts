import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Mascota } from 'src/app/interfaces/mascota';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MascotaService } from 'src/app/services/mascota.service';
import { MatDialog } from '@angular/material/dialog';
import { EliminarDialogoComponent } from '../eliminar-dialogo/eliminar-dialogo.component';


@Component({
  selector: 'app-listado-mascota',
  templateUrl: './listado-mascota.component.html',
  styleUrls: ['./listado-mascota.component.css']
})
export class ListadoMascotaComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['nombre', 'edad', 'raza', 'color', 'peso', 'acciones'];
  dataSource = new MatTableDataSource<Mascota>();
  loading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _snackBar: MatSnackBar, 
                private _mascotaService:MascotaService,
                private dialog:MatDialog) {}

  ngOnInit(): void {
    this.obtenerMascota();
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if(this.dataSource.data.length > 0) {
      this.paginator._intl.itemsPerPageLabel = 'Items por pagina';
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



  obtenerMascota() {
     this.loading = true;
     this._mascotaService.getMascotas().subscribe(data => {
       this.loading = false;
       this.dataSource.data = data;
     })
   }


  // Asi es como se hace 
  // obtenerMascota() {
  //   this.loading = true;
  //   this._mascotaService.getMascotas().subscribe({
  //     next: (data) => {
  //       this.loading = false;
  //       this.dataSource.data = data;
  //     },
  //     error: (e) => this.loading = false,
  //     complete: () => console.info('complete')
  //   })
  // }


  eliminarMascota(id:number) {
    let dialogRef = this.dialog.open(EliminarDialogoComponent);
    dialogRef.afterClosed().subscribe(result => {
      result ??= false; // Asigna false a result si es null o undefined
      if(result) {
        this._mascotaService.deleteMascota(id).subscribe(() => {
          this.mensajeExito();
          this.loading = false;
          this.obtenerMascota();
        });
      } 
    });
  }

  mensajeExito() 
    {
      this._snackBar.open("La mascota fue eliminada con exito", '', {
        duration: 4000,
        horizontalPosition: 'right'
      });
    }

}