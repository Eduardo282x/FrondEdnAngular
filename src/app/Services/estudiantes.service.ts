import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environments';
import {Observable} from 'rxjs';
import { Estudiantes } from '../Interfaces/estudiantes';

@Injectable({
  providedIn: 'root'
})
export class EstudiantesService {

  private endpoint:string = environment.endPoint;
  private apiUrl:string = this.endpoint + "api/";

  constructor(private http:HttpClient) { }


  getList():Observable<Estudiantes[]>{
    return this.http.get<Estudiantes[]>(`${this.apiUrl}show`);
  }

  add(modelo:Estudiantes):Observable<Estudiantes>{
    return this.http.post<Estudiantes>(`${this.apiUrl}insert`,modelo);
  }

  update(ID:number,modelo:Estudiantes):Observable<Estudiantes>{
    return this.http.put<Estudiantes>(`${this.apiUrl}update?ID=${ID}`,modelo);
  }

  delete(ID:number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}delete?ID=${ID}`);
  }
}
