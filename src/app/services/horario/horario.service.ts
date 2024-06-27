import { Injectable, inject } from '@angular/core';
import { Horario } from '../../models/horario/horario';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {

  http = inject(HttpClient);

  API = environment.SERVIDOR+"/api/horario";

  constructor() { }

  listAll(): Observable<Horario[]> {
    return this.http.get<Horario[]>(this.API+"/listAll");
  }

  save(obj: Horario): Observable<string> {
    return this.http.post<string>(this.API+"/save", obj, {responseType: 'text' as 'json'} );
  }

  update(obj: Horario): Observable<string> {
    return this.http.put<string>(this.API+"/update/"+obj.idHorario, obj, {responseType: 'text' as 'json'} );
  }

  delete(id: number): Observable<string> {
    return this.http.delete<string>(this.API+"/delete/"+id, {responseType: 'text' as 'json'} );
  }

  findById(id: number): Observable<Horario> {
    return this.http.get<Horario>(this.API+"/findById/"+id );
  }

  findByIdCliente(id: number): Observable<Horario[]> {
    return this.http.get<Horario[]>(this.API+"/findByIdCliente/"+id );
  }
}
