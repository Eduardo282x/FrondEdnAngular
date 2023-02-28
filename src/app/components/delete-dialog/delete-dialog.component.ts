import { Component, OnInit, Inject } from '@angular/core';

import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Estudiantes } from 'src/app/Interfaces/estudiantes';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

  constructor(
    private EstudianteReferencias: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA)public dataEstudiantes: Estudiantes
  ){}

  ngOnInit(): void {

  }

  delete(){
    if(this.dataEstudiantes){
      this.EstudianteReferencias.close("eliminar")
    }
  }
}
