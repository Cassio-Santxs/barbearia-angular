import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../../models/cliente/cliente';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  http = inject(HttpClient);

  API = environment.SERVIDOR+"/api/cliente";

  constructor() { }

  save(obj: Cliente): Observable<string> {
    return this.http.post<string>(this.API+"/save", obj, {responseType: 'text' as 'json'} );
  }
  





 
}
