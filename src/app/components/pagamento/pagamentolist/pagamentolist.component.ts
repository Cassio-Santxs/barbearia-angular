import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Pagamento } from '../../../models/pagamento/pagamento';
import { PagamentodetailsComponent } from '../pagamentodetails/pagamentodetails.component';
import { PagamentoService } from '../../../services/pagamento/pagamento.service';
import { Cliente } from '../../../models/cliente/cliente';
import { Funcionario } from '../../../models/funcionario/funcionario';
import { Horario } from '../../../models/horario/horario';
import { FormaPagamento } from '../../../models/formaPagamento/forma-pagamento';

@Component({
  selector: 'app-pagamentolist',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MdbModalModule,
    PagamentodetailsComponent
  ],
  templateUrl: './pagamentolist.component.html',
  styleUrl: './pagamentolist.component.scss'
})
export class PagamentolistComponent {
  modalService = inject(MdbModalService); 
  pagamentoService = inject(PagamentoService);

  @ViewChild('modalDetalhe') modalDetalhe!: TemplateRef<any>; 

  modalRef!: MdbModalRef<any>; 

  lista: Pagamento[] = [];
  objEdit!: Pagamento;
listaPagamentos: any;

  constructor() {
    this.listAll();
  }

  listAll(){
      this.pagamentoService.listAll().subscribe({
        next: lista => {
          this.lista = lista;
        },
        error: erro => {
          console.log('Erro ao carregar listagem de registros!', erro);
        }
      });
  }

  deleteById(obj: Pagamento) {
    if (confirm('Tem certeza que deseja deletar este registro?')) {
      this.pagamentoService.delete(obj.idPagamento).subscribe({
        next: retorno => {
          console.log('Deletado com sucesso!', retorno);
          this.listAll();
        },
        error: erro => {
          console.log('Erro ao deletar registro!', erro);
        }
      });
    }
  }
  new() {
    let cliente: Cliente = new Cliente(
      1,
      'Nome do Cliente',
      '123.456.789-00',
      'cliente@email.com',
      'senhaDoCliente',
      
    );
  
    let funcionario: Funcionario = new Funcionario(
      1, 
      'Nome do Funcionário',
      true, 
      '123.456.789-00', 
      'funcionario@email.com',
      'senhaDoFuncionario'
    );
    let horario: Horario = new Horario(0, "", cliente, funcionario, 20.00);
    let formaPagamento: FormaPagamento = new FormaPagamento(0,'Nome do Cliente'); 
    this.objEdit = new Pagamento(0, "",horario, formaPagamento, "");
    this.modalRef = this.modalService.open(this.modalDetalhe);
  }
  

  edit(obj: Pagamento) {
    this.objEdit = Object.assign({}, obj); 
    this.modalRef = this.modalService.open(this.modalDetalhe);
  }

  retornoDetalhe(obj: Pagamento) {
    this.listAll();
    this.modalRef.close();
  }
}
