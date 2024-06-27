import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { FormaPagamento } from '../../models/formaPagamento/forma-pagamento';
import { Observable } from 'rxjs';
import { Form } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormaPagamentoService {

  http = inject(HttpClient);

  API = environment.SERVIDOR+"/api/formaPagamento";

  constructor() { }

  listAll(): Observable<FormaPagamento[]> {
    return this.http.get<FormaPagamento[]>(this.API+"/findAll");
  }

  save(obj: FormaPagamento): Observable<string> {
    return this.http.post<string>(this.API+"/save", obj, {responseType: 'text' as 'json'} );
  }

  update(obj: FormaPagamento): Observable<string> {
    return this.http.put<string>(this.API+"/update/"+obj.idFormaPagto, obj, {responseType: 'text' as 'json'} );
  }

  delete(id: number): Observable<string> {
    return this.http.delete<string>(this.API+"/delete/"+id, {responseType: 'text' as 'json'} );
  }

  findById(id: number): Observable<FormaPagamento> {
    return this.http.get<FormaPagamento>(this.API+"/findById/"+id );
  }
}
