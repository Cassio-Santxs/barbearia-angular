import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../../models/cliente/cliente';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  http = inject(HttpClient);

  API = "http://localhost:8080/api/cliente";

  constructor() { }

  save(obj: Cliente): Observable<string> {
    return this.http.post<string>(this.API+"/save", obj, {responseType: 'text' as 'json'} );
  }
  





 
}
