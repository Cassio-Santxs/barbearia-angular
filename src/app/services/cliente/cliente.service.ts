import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../../models/cliente/cliente';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  http = inject(HttpClient);

  API = environment.SERVIDOR+"/api/cliente";

  private idCliente: number | null = null;

  constructor() { }

  setIdCliente(id: number) {
    this.idCliente = id;
  }

  getIdCliente(): number | null {
    return this.idCliente;
  }

  listAll(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.API+"/listAll");
  }

  save(obj: Cliente): Observable<string> {
    return this.http.post<string>(this.API+"/save", obj, {responseType: 'text' as 'json'} );
  }

  update(obj: Cliente): Observable<string> {
    return this.http.put<string>(this.API+"/update/"+obj.idCliente, obj, {responseType: 'text' as 'json'} );
  }

  delete(id: number): Observable<string> {
    return this.http.delete<string>(this.API+"/delete/"+id, {responseType: 'text' as 'json'} );
  }

  findById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(this.API+"/findById/"+id );
  }

  findByUsername(username: string): Observable<Cliente> {
    return this.http.get<Cliente>(this.API+"/findByUsername/"+username );
  }
}
