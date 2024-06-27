import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Funcionario } from '../../models/funcionario/funcionario'; 
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  save(obj: Funcionario) {
    throw new Error('Method not implemented.');
  }

  http = inject(HttpClient);
  api = environment.SERVIDOR+"/api/funcionario";

  constructor() { }

  findAll(): Observable<Funcionario[]>{
    return this.http.get<Funcionario[]>(this.api+"/findAll");
  }

  salvar(obj: Funcionario):Observable<String>{
    return this.http.post<string>(this.api+"/save", obj, {responseType: "text" as "json"});
  }

  update(obj: Funcionario): Observable<string> {
    return this.http.put<string>(this.api+"/update/"+obj.idFuncionario, obj, {responseType: 'text' as 'json'} );
  }

  delete(id: number): Observable<string> {
    return this.http.delete<string>(this.api+"/deleteById/"+id, {responseType: 'text' as 'json'} );
  }

  findById(id: number): Observable<Funcionario> {
    return this.http.get<Funcionario>(this.api+"/findById/"+id);
  }
}
