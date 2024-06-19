import { CanActivateFn } from '@angular/router';
import { LoginService } from './login.service';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = (route, state) => {

  let loginService = inject(LoginService);

  // if(loginService.hasPermission("cliente") && state.url == "admin/funcionario"){
  //   alert("você não tem permissão")
  //   return false;
  // }

  return true;
};
