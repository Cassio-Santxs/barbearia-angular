import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { FormaPagamentoService } from '../../../services/formaPagamento/forma-pagamento.service';
import { FormaPagamento } from '../../../models/formaPagamento/forma-pagamento';
import Swal from 'sweetalert2';
import { FormaPagamentodetailsComponent } from '../forma-pagamentodetails/forma-pagamentodetails.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { LogService } from '../../../services/log/log.service';

@Component({
  selector: 'app-forma-pagamentolist',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    RouterLink,
    MdbModalModule,
    FormaPagamentodetailsComponent,
    MdbAccordionModule],
  templateUrl: './forma-pagamentolist.component.html',
  styleUrl: './forma-pagamentolist.component.scss'
})
export class FormaPagamentolistComponent {

  modalService = inject(MdbModalService); 
  service = inject(FormaPagamentoService);
  logservice = inject(LogService);
  @ViewChild('modalDetalhe') modalDetalhe!: TemplateRef<any>; 

  modalRef!: MdbModalRef<any>; 

  lista: FormaPagamento[] = [];
  objEdit!: FormaPagamento;

  constructor() {
    this.listAll();
  }

  listAll(){
      this.service.listAll().subscribe({
        next: lista => {
          this.lista = lista;
        },
        error: erro => {
          alert('Erro ao carregar listagem de registros!');
        }
      });
  }



  deleteById(obj: FormaPagamento) {
    Swal.fire({
      title: 'Tem certeza que deseja deletar este registro?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(obj.idFormaPagto!).subscribe({
          next: retorno => {
  
            Swal.fire({
              title: 'Deletado com sucesso!',
              icon: 'success',
              confirmButtonText: 'Ok'
            });

            if (obj.idFormaPagto) {
              this.logservice.logDeleteOperation(obj.idFormaPagto, 'forma_pagamento', 'funcionario@hotmail.com').subscribe({
                next: retorno => {
                  console.log('Log salvo com sucesso:', retorno);
                },
                error: erro => {
                  console.log('Erro ao registrar log de deleção:', erro);
                }
              });
            } else {
              console.log('ID é inválido ou não encontrado.');
            }

            this.listAll();
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
    });
  }


  new() {
    this.objEdit = new FormaPagamento(0,'Nome do Forma Pagamento');
    this.modalRef = this.modalService.open(this.modalDetalhe);
  }

  edit(obj: FormaPagamento) {
    this.objEdit = Object.assign({}, obj); 
    this.modalRef = this.modalService.open(this.modalDetalhe);
  }




  retornoDetalhe(obj: FormaPagamento) {
    this.listAll();
    this.modalRef.close();
  } 


}
