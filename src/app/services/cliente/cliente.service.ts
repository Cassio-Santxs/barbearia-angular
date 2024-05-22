import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../../models/cliente/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  http = inject(HttpClient);

  API = "http://localhost:8080/api/cliente";

  constructor() { }

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
}
