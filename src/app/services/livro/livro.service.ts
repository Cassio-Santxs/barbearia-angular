import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Livro } from '../../models/livro'; 

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  http = inject(HttpClient);

  API = "http://localhost:8080/api/livro";

  constructor() { }

  listAll(): Observable<Livro[]> {
    return this.http.get<Livro[]>(this.API+"/listAll");
  }

  save(obj: Livro): Observable<string> {
    return this.http.post<string>(this.API+"/save", obj, {responseType: 'text' as 'json'} );
  }

  update(obj: Livro): Observable<string> {
    return this.http.put<string>(this.API+"/update/"+obj.id, obj, {responseType: 'text' as 'json'} );
  }

  delete(id: number): Observable<string> {
    return this.http.delete<string>(this.API+"/delete/"+id, {responseType: 'text' as 'json'} );
  }

  findById(id: number): Observable<Livro> {
    return this.http.get<Livro>(this.API+"/findById/"+id );
  }

}