import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Cliente } from '../../../models/cliente/cliente';
import { ClienteService } from '../../../services/cliente/cliente.service';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { inject } from '@angular/core/testing';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
  providers: [provideNgxMask()],
})
export class CadastroComponent {
  // Propriedades de entrada e saída
  @Input() obj: Cliente = new Cliente(1, 'Nome do Cliente', '123.456.789-00', 'cliente@email.com', 'senhaDoCliente');
  @Output() retorno: EventEmitter<any> = new EventEmitter();

  // Propriedades para serviços e roteamento
  router2: ActivatedRoute;
  router: Router;
  service: ClienteService;

  // Construtor para injetar serviços
  constructor(private activatedRoute: ActivatedRoute, private routerService: Router, private clienteService: ClienteService){
    this.router2 = activatedRoute;
    this.router = routerService;
    this.service = clienteService;
  }

  // Método para salvar um cliente
  save(){
    if(this.obj.idCliente! > 0){
      // Atualização do cliente
      this.service.update(this.obj).subscribe({
        next: retorno => {
          // Sucesso na atualização
          Swal.fire({
            title: 'Editado com sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          // Redireciona para outra rota com dados do objeto atualizado
          this.router.navigate(['admin/livros'], { state: { objNovo: this.obj } });
          // Emite evento de retorno
          this.retorno.emit(this.obj);
        },
        error: erro => {
          // Erro na atualização
          alert(erro.status); // Exibe o código de status do erro em um alerta
          console.log(erro); // Log do erro no console
          Swal.fire({
            title: 'Deu algum erro!',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
      });
    } else {
      // Criação de um novo cliente
      this.service.save(this.obj).subscribe({
        next: retorno => {
          // Sucesso ao salvar
          Swal.fire({
            title: 'Salvo com sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          // Redireciona para outra rota com dados do objeto salvo
          this.router.navigate(['admin/livros'], { state: { objNovo: this.obj } });
          // Emite evento de retorno
          this.retorno.emit(this.obj);
        },
        error: erro => {
          // Erro ao salvar
          alert(erro.status); // Exibe o código de status do erro em um alerta
          console.log(erro); // Log do erro no console
          Swal.fire({
            title: 'Deu algum erro!',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
      });
    }
  }
}
