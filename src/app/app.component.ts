import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';

import { MatSnackBar } from '@angular/material/snack-bar';


import { Estudiantes } from './Interfaces/estudiantes';
import { EstudiantesService } from './Services/estudiantes.service';
import { OpenDialogComponent } from './components/open-dialog/open-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['Nombre', 'Apellido', 'Cedula', 'Escuela','Acciones'];
  dataSource = new MatTableDataSource<Estudiantes>();

  constructor(
    private _estudianteService: EstudiantesService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
    )
    {

    }

    openDialogEdit(dataEstudiantes: Estudiantes) {
      this.dialog.open(OpenDialogComponent,{
        disableClose:true,
        data:dataEstudiantes
      }).afterClosed().subscribe(resultado => {
        if (resultado === "Modificado"){
          this.mostrarEstudiantes();
        }
      });
    }

    openDialog() {
      this.dialog.open(OpenDialogComponent,{
        disableClose:true,

      }).afterClosed().subscribe(resultado => {
        if (resultado === "Creado"){
          this.mostrarEstudiantes();
        }
      });
    }

    ngOnInit(): void {
      this.mostrarEstudiantes();
    }

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
    }


    mostrarEstudiantes(){
      this._estudianteService.getList().subscribe({
        next:(datos)=>{
          console.log(datos);
          this.dataSource.data = datos;
        },error:(e)=>{}
      })
  }

    mostrarMsg(msg: string, accion: string) {
      this._snackBar.open(msg, accion,{
        horizontalPosition:"end",
        verticalPosition:"top",
        duration:3000
      });
    }

    dialogDelete(dataEstudiantes:Estudiantes){
      this.dialog.open(DeleteDialogComponent,{
        disableClose:true,
        data:dataEstudiantes
      }).afterClosed().subscribe(resultado => {
        if (resultado === "eliminar"){

          this._estudianteService.delete(dataEstudiantes.ID).subscribe({
            next:(datos)=>{
              this.mostrarMsg("El Estudiante fue Eliminar","Listo");
              this.mostrarEstudiantes();
            },error:(e)=>{}
          })
        }
      });
    }

}
