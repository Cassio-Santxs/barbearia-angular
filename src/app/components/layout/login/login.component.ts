import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { LoginService } from '../../../auth/login.service';
import { Login } from '../../../auth/login';
import { ClienteService } from '../../../services/cliente/cliente.service';
import Swal from 'sweetalert2';
import { Cliente } from '../../../models/cliente/cliente';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MdbFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})

export class LoginComponent {
  
  login = new Login();
  cliente: Cliente = new Cliente(1,'Nome do Cliente','123.456.789-00','cliente@email.com','senhaDoCliente');

  router = inject(Router);
  loginService = inject(LoginService);
  clienteService = inject(ClienteService);

  constructor(){
    this.loginService.removerToken();
  }

  logar() {
    this.clienteService.findByUsername(this.login.username).subscribe({
      next: data => {
        this.cliente = data;

        this.loginService.logar(this.login).subscribe({
          next: token => { // QUANDO DÁ CERTO
            console.log(token);
        if(token)
          //console.log(token)
          this.loginService.addToken(token); //MUITO IMPORTANTE
          if(this.loginService.hasPermission("admin"))
            {
              localStorage.setItem('idCliente', "0");
              this.router.navigate(['/admin/dashboard']);
            }
            else {
              localStorage.setItem('idCliente', this.cliente.idCliente != null ? this.cliente.idCliente.toString() : "0");
              this.router.navigate(['/cliente/perfil']);
            }
          },
          error: erro => { // QUANDO DÁ ERRO
            //alert('Usuário ou senha incorretas');
            console.error(erro);
          }
        });
      },
      error: erro => {
        Swal.fire({
          title: erro.error ? erro.error.toString()  : erro.message.toString(),
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    });
  }
}