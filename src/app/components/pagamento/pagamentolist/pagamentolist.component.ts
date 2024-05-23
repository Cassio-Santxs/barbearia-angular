import { Component, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Pagamento } from '../../../models/pagamento/pagamento';
import { PagamentodetailsComponent } from '../pagamentodetails/pagamentodetails.component';
import { PagamentoService } from '../../../services/pagamento/pagamento.service';

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
  @ViewChild('modalDetalhe') modalDetalhe!: TemplateRef<any>; 

  modalRef!: MdbModalRef<any>; 

  lista: Pagamento[] = [];
  objEdit!: Pagamento;
listaPagamentos: any;

  constructor(private modalService: MdbModalService, 
              private pagamentoService: PagamentoService) {
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

  

  edit(obj: Pagamento) {
    this.objEdit = Object.assign({}, obj); 
    this.modalRef = this.modalService.open(this.modalDetalhe);
  }

  retornoDetalhe(obj: Pagamento) {
    this.listAll();
    this.modalRef.close();
  }
}
