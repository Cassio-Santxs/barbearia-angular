import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode, JwtPayload } from "jwt-decode";
import { Login } from './login';
import { Payload } from './payload.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  http = inject(HttpClient);
  API = environment.SERVIDOR+"/api/login";


  constructor() { }


  logar(login: Login): Observable<string> {
    return this.http.post<string>(this.API, login, {responseType: 'text' as 'json'});
  }

  addToken(token: string) {
    try{
      const Objeto = JSON.parse(token);
      const clean_token = Objeto.access_token;
      localStorage.setItem('token', token);

      if(clean_token){
        localStorage.setItem('token', clean_token);
      }else{
        console.error('erro', Objeto);
      }

    }catch(error){
      console.error('erro', error);
    }
  }

  removerToken() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }


  jwtDecode() {
    let token = this.getToken();
    if (token) {
      return jwtDecode<JwtPayload>(token);
    }
    return "";
  }

  hasPermission(role: string) {
    let user = this.jwtDecode() as Payload;
    console.log(user);
    if (user.role == role)
      return true;
    else
      return false;
  }


}
