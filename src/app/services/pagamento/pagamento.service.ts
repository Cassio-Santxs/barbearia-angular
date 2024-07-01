import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Pagamento } from "../../models/pagamento/pagamento";
import { Observable, throwError } from "rxjs";
import { environment } from "../../../environments/environment";
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PagamentoService {
    http = inject(HttpClient);

    API = environment.SERVIDOR + "/api/pagamento";
  pagamentos: Pagamento[] | undefined;
  pagamentoService: any;

  constructor(private httpClient: HttpClient)  { }

    listAll(): Observable<Pagamento[]> {
        return this.http.get<Pagamento[]>(this.API + "/listAll")
            .pipe(
                catchError(this.handleError)
            );
    }

    save(obj: Pagamento): Observable<string> {
        return this.http.post<string>(this.API + "/save", obj, { responseType: 'text' as 'json' })
            .pipe(
                catchError(this.handleError)
            );
    }

    update(obj: Pagamento): Observable<string> {
        return this.http.put<string>(this.API + "/update/" + obj.idPagamento, obj, { responseType: 'text' as 'json' })
            .pipe(
                catchError(this.handleError)
            );
    }

    delete(id: number): Observable<string> {
        return this.http.delete<string>(this.API + "/delete/" + id, { responseType: 'text' as 'json' })
            .pipe(
                catchError(this.handleError)
            );
    }

    findById(id: number): Observable<Pagamento> {
        return this.http.get<Pagamento>(this.API + "/findById/" + id)
            .pipe(
                catchError(this.handleError)
            );
    }

    private handleError(error: any) {
        console.error('Ocorreu um erro', error);
        return throwError(error);
    }
    ngOnInit(): void {
    this.carregarPagamentos();
  }

  carregarPagamentos() {
    this.pagamentoService.listAll()
      .subscribe(
        (data: Pagamento[]) => {
          this.pagamentos = data;
        },
        (error: any) => { // Tipagem explícita para 'error'
          console.error('Erro ao carregar pagamentos', error);
          // Trate o erro de acordo com suas necessidades
        }
      );
  }
  }