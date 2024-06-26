import { Component, inject } from '@angular/core';
import { Cliente } from '../../models/cliente/cliente';
import { CommonModule } from '@angular/common';
import { ClienteService } from '../../services/cliente/cliente.service';
import { Horario } from '../../models/horario/horario';
import { HorarioService } from '../../services/horario/horario.service';
import { Pagamento } from '../../models/pagamento/pagamento';
import { PagamentoService } from '../../services/pagamento/pagamento.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  randomCount1: number;
  randomCount2: number;

  clientes: Cliente[] = [
    { idCliente: 1, nmCliente: 'John Doe', dsCpf: '123.456.789-00', dsEmail: 'john@example.com', dsSenha: 'password123' },
    { idCliente: 2, nmCliente: 'Jane Smith', dsCpf: '987.654.321-00', dsEmail: 'jane@example.com', dsSenha: 'password456'},
  ];

  serviceCliente = inject(ClienteService);
  serviceHorario = inject(HorarioService);
  servicePagamento = inject(PagamentoService);

  listaClientes: Cliente[] = [];
  listaHorarios: Horario[] = [];
  listaPagamentos: Pagamento[] = [];

  constructor() {
    this.randomCount1 = Math.floor(Math.random() * 1000);
    this.randomCount2 = Math.floor(Math.random() * 1000);
    this.listAllClientes();
    this.listAllHorarios()
  }

  listAllClientes(){
      this.serviceCliente.listAll().subscribe({
        next: lista => {
          this.listaClientes = lista;
        },
        error: erro => {
          alert('Erro ao carregar listagem de registros!');
        }
      });
  }

  listAllHorarios(){
    this.serviceHorario.listAll().subscribe({
      next: lista => {
        this.listaHorarios = lista;
      },
      error: erro => {
        alert('Erro ao carregar listagem de registros!');
      }
    });
  }

  listAllPagamentos(){
    this.servicePagamento.listAll().subscribe({
      next: lista => {
        this.listaPagamentos = lista;
      },
      error: erro => {
        alert('Erro ao carregar listagem de registros!');
      }
    });
  }

  ngOnInit(): void {
  }
}
