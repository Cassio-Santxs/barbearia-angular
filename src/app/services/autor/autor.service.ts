import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Autor } from '../../models/autor'; 

@Injectable({
  providedIn: 'root'
})
export class AutorService {

  http = inject(HttpClient);

  API = "http://localhost:8080/api/autor";

  constructor() { }

  listAll(): Observable<Autor[]> {
    return this.http.get<Autor[]>(this.API+"/listAll");
  }

  save(obj: Autor): Observable<string> {
    return this.http.post<string>(this.API+"/save", obj, {responseType: 'text' as 'json'} );
  }

  update(obj: Autor): Observable<string> {
    return this.http.put<string>(this.API+"/update/"+obj.id, obj, {responseType: 'text' as 'json'} );
  }

  delete(id: number): Observable<string> {
    return this.http.delete<string>(this.API+"/delete/"+id, {responseType: 'text' as 'json'} );
  }

  findById(id: number): Observable<Autor> {
    return this.http.get<Autor>(this.API+"/findById/"+id );
  }

}