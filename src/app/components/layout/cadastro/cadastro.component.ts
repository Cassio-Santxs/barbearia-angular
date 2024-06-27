import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { CadastroService } from '../../../services/cadastro/cadastro.service';
import { Cliente } from '../../../models/cliente/cliente';
import { ClienteService } from '../../../services/cliente/cliente.service';

@Component({
  selector: 'app-cadastrocomponent',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
  providers: [provideNgxMask()],
  imports: [FormsModule, CommonModule, MdbFormsModule, NgxMaskDirective, NgxMaskPipe],
  standalone: true
})
export class CadastroComponent {
  obj: Cliente;
  confirmarsenha: string = ''; // Inicialização da propriedade confirmarsenha

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cadastroService: ClienteService
  ) {
    // Certifique-se de passar o email correto do cliente para dsEmail
    this.obj = new Cliente(
      0,
      'Nome do Cliente',
      '123.456.789-00',
      '', // Coloque aqui o email correto do cliente
      'senhaDoCliente',
      [], // Array de horários
      '', // Ajuste conforme a estrutura real do Cliente
      'cliente'
    );
    this.obj.username = this.obj.dsEmail; // Atribui ds-email para username
  }

  save() {
    this.cadastroService.save(this.obj).subscribe({
      next: retorno => {
        Swal.fire({
          title: 'Salvo com sucesso!',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        this.router.navigate(['/login'], { state: { objNovo: this.obj } });
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
