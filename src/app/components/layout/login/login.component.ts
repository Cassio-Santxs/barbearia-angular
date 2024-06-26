import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { LoginService } from '../../../auth/login.service';
import { Login } from '../../../auth/login';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MdbFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})

export class LoginComponent {
  
  login = new Login();

  router = inject(Router);
  loginService = inject(LoginService);

  constructor(){
    this.loginService.removerToken();
  }

  logar() {
    this.loginService.logar(this.login).subscribe({
      next: token => { // QUANDO DÁ CERTO
        console.log(token);
		if(token)
      //console.log(token)
			this.loginService.addToken(token); //MUITO IMPORTANTE
        this.router.navigate(['/admin/dashboard']);
      },
      error: erro => { // QUANDO DÁ ERRO
        //alert('Usuário ou senha incorretas');
        console.error(erro);
      }
    });
  }
}