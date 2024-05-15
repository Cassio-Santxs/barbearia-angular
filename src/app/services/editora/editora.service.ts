import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Editora } from '../../models/editora'; 

@Injectable({
  providedIn: 'root'
})
export class EditoraService {

  http = inject(HttpClient);

  API = "http://localhost:8080/api/editora";

  constructor() { }

  listAll(): Observable<Editora[]> {
    return this.http.get<Editora[]>(this.API+"/listAll");
  }

  save(obj: Editora): Observable<string> {
    return this.http.post<string>(this.API+"/save", obj, {responseType: 'text' as 'json'} );
  }

  update(obj: Editora): Observable<string> {
    return this.http.put<string>(this.API+"/update/"+obj.id, obj, {responseType: 'text' as 'json'} );
  }

  delete(id: number): Observable<string> {
    return this.http.delete<string>(this.API+"/delete/"+id, {responseType: 'text' as 'json'} );
  }

  findById(id: number): Observable<Editora> {
    return this.http.get<Editora>(this.API+"/findById/"+id );
  }

}