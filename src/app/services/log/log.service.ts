import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Log } from '../../models/log/log'; 
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  save(obj: Log) {
    throw new Error('Method not implemented.');
  }

  http = inject(HttpClient);
  api = environment.SERVIDOR+"/api/log";

  constructor() { }

  findAll(): Observable<Log[]>{
    return this.http.get<Log[]>(this.api+"/findAll");
  }

  salvar(obj: Log):Observable<String>{
    return this.http.post<string>(this.api+"/save", obj, {responseType: "text" as "json"});
  }

  update(obj: Log): Observable<string> {
    return this.http.put<string>(this.api+"/update/"+obj.idLog, obj, {responseType: 'text' as 'json'} );
  }

  delete(id: number): Observable<string> {
    return this.http.delete<string>(this.api+"/deleteById/"+id, {responseType: 'text' as 'json'} );
  }

  findById(id: number): Observable<Log> {
    return this.http.get<Log>(this.api+"/findById/"+id);
  }
}
