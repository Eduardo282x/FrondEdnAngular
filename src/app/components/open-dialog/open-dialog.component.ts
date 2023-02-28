import { Component, OnInit, Inject } from '@angular/core';

import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatGridListModule} from '@angular/material/grid-list';

import { Estudiantes } from 'src/app/Interfaces/estudiantes';
import { EstudiantesService } from 'src/app/Services/estudiantes.service';


@Component({
  selector: 'app-open-dialog',
  templateUrl: './open-dialog.component.html',
  styleUrls: ['./open-dialog.component.css']
})
export class OpenDialogComponent implements OnInit {


  formEstudiantes: FormGroup;
  tituloAccion: string = "Nuevo";
  botonAccion: String = "Guardar";
  listaEstudiantes: Estudiantes[]=[];
  constructor(
    private EstudianteReferencias: MatDialogRef<OpenDialogComponent>,
    private fb:FormBuilder,
    private _snackBar: MatSnackBar,
    private _estudianteServicio: EstudiantesService,
    @Inject(MAT_DIALOG_DATA)public dataEstudiantes: Estudiantes
  ){
    this.formEstudiantes = this.fb.group
    ({
        Nombre:["",Validators.required],
        Apellido:["",Validators.required],
        Cedula:["",Validators.required],
        Escuela:["",Validators.required]
      })

      this._estudianteServicio.getList().subscribe({
        next:(datos)=>{
          this.listaEstudiantes = datos;
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


  addEditEstudiante(){
    console.log(this.formEstudiantes)
    console.log(this.formEstudiantes.value)

    const modelo: Estudiantes = {
      ID:0,
      Nombre: this.formEstudiantes.value.Nombre,
      Apellido: this.formEstudiantes.value.Apellido,
      Cedula: this.formEstudiantes.value.Cedula,
      Escuela: this.formEstudiantes.value.Escuela,
    }

    if(this.dataEstudiantes == null){

      this._estudianteServicio.add(modelo).subscribe({
        next:(data)=> {
          this.mostrarMsg("Estudiante Añadido Correctamente","Listo");
          this.EstudianteReferencias.close("Creado");
        },error:(e)=>{
          this.mostrarMsg("Error al Añadir Estudiante","Error");
        }
      })

    } else {

      this._estudianteServicio.update(this.dataEstudiantes.ID,modelo).subscribe({
        next:(data)=> {
          this.mostrarMsg("Estudiante Actualizado Correctamente","Listo");
          this.EstudianteReferencias.close("Modificado");
        },error:(e)=>{
          this.mostrarMsg("Error al Modificar Estudiante","Error");
        }
      })

    }

    this._estudianteServicio.add(modelo).subscribe({
      next:(data)=> {
        this.mostrarMsg("Estudiante Añadido Correctamente","Listo");
        this.EstudianteReferencias.close("Creado");
      },error:(e)=>{
        this.mostrarMsg("Error al Añadir Estudiante","Error");
      }
    })
  }

  ngOnInit(): void {
    if(this.dataEstudiantes){
      this.formEstudiantes.patchValue({
        Nombre: this.dataEstudiantes.Nombre,
        Apellido: this.dataEstudiantes.Apellido,
        Cedula: this.dataEstudiantes.Cedula,
        Escuela: this.dataEstudiantes.Escuela,
      })

      this.tituloAccion = "Editar";
      this.botonAccion = "Modificar";
    }
  }

}
