import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Pagamento } from "../../models/pagamento/pagamento";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
  })
export class PagamentoService {
    http = inject(HttpClient);

  API = environment.SERVIDOR+"/api/pagamento";

  constructor() { }

  listAll(): Observable<Pagamento[]> {
    return this.http.get<Pagamento[]>(this.API+"/listAll");
  }

  save(obj: Pagamento): Observable<string> {
    return this.http.post<string>(this.API+"/save", obj, {responseType: 'text' as 'json'} );
  }

  update(obj: Pagamento): Observable<string> {
    return this.http.put<string>(this.API+"/update/"+obj.idPagamento, obj, {responseType: 'text' as 'json'} );
  }

  delete(id: number): Observable<string> {
    return this.http.delete<string>(this.API+"/delete/"+id, {responseType: 'text' as 'json'} );
  }

  findById(id: number): Observable<Pagamento> {
    return this.http.get<Pagamento>(this.API+"/findById/"+id );
  }
}
