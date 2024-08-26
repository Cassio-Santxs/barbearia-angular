import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Log } from '../../models/log/log'; 
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  http = inject(HttpClient);
  api = environment.SERVIDOR+"/api/log";

  constructor() { }

  findAll(): Observable<Log[]>{
    return this.http.get<Log[]>(this.api+"/findAll");
  }

  salvar(obj: Log):Observable<string>{
    return this.http.post<string>(this.api+"/save", obj, {responseType: "text" as "json"});
  }

  salvarTodos(logs: Log[]): Observable<string> {
    return this.http.post<string>(this.api + "/saveAll", logs, { responseType: "text" as "json" });
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

  compareAndLogDifferences<T>(mainObject: T, auxiliaryObject: T, dsTabela: string, dsEmailUsuario: string): Observable<string> {
    const logs: Log[] = [];
    const dtAlteracao = new Date().toString();
  
    for (const key in mainObject) {
      if (Object.prototype.hasOwnProperty.call(mainObject, key) && 
          Object.prototype.hasOwnProperty.call(auxiliaryObject, key)) {
        const oldValue = auxiliaryObject[key];
        const newValue = mainObject[key];
        console.log(oldValue);
        console.log(newValue);
        if (oldValue !== newValue) {
          const log = new Log(
            undefined,
            newValue as string,
            oldValue as string,
            dtAlteracao,
            dsEmailUsuario,
            dsTabela,
            key
          );
          logs.push(log);
        }
      }
    }
    
    console.log(logs);
    return this.salvarTodos(logs);
  }

  logInsertOperation(id: number, dsTabela: string, dsEmailUsuario: string): Observable<string> {
    const dtAlteracao = new Date().toString();
  
    const log = new Log(
      undefined,
      id.toString(),
      '',
      dtAlteracao,
      dsEmailUsuario,
      dsTabela,
      'INSERT'
    );
    
    return this.salvar(log);
  }
  
  logDeleteOperation(id: number, dsTabela: string, dsEmailUsuario: string): Observable<string>  {
    const dtAlteracao = new Date().toString();
  
    const log = new Log(
      undefined,
      id.toString(),
      '',
      dtAlteracao,
      dsEmailUsuario,
      dsTabela,
      'DELETE'
    );

    return this.salvar(log);
  }
}
