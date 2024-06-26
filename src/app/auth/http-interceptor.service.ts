import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const meuhttpInterceptor: HttpInterceptorFn = (request, next) => {

  let router = inject(Router);


  //inclui o token do localstorage em cadas requisicao http
  let token = localStorage.getItem('token');
  if (token && !router.url.includes('/login') && !router.url.includes('/cadastro')) {
    request = request.clone({
      setHeaders: { Authorization: 'Bearer ' + token },
    });
  }


  //trata os erros dos responses
  return next(request).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
	  
	  
        if (err.status === 401) {
          alert('Usuário ou senha incorretos');
        } else if (err.status === 403) {
          alert('Você não tem permissão');
        } else {
          console.error('HTTP error:', err);
        }
		
		
      } else {
        console.error('An error occurred:', err);
      }

      return throwError(() => err);
    })
  );
};
