import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MdbModalModule, MdbModalRef, MdbModalService, } from 'mdb-angular-ui-kit/modal';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { Cliente } from '../../../models/cliente/cliente';
import { ClienteService } from '../../../services/cliente/cliente.service';
import { ClientedetailsComponent } from '../clientedetails/clientedetails.component';
import { LogService } from '../../../services/log/log.service';

@Component({
  selector: 'app-clientelist',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MdbModalModule,
    ClientedetailsComponent,
    MdbAccordionModule
  ],
  templateUrl: './clientelist.component.html',
  styleUrl: './clientelist.component.scss'
})
export class ClientelistComponent {
  modalService = inject(MdbModalService); 
  service = inject(ClienteService);
  logservice = inject(LogService);

  @ViewChild('modalDetalhe') modalDetalhe!: TemplateRef<any>; 

  modalRef!: MdbModalRef<any>; 

  lista: Cliente[] = [];
  objEdit!: Cliente;

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

  deleteById(obj: Cliente) {
    Swal.fire({
      title: 'Tem certeza que deseja deletar este registro?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(obj.idCliente!).subscribe({
          next: retorno => {
  
            Swal.fire({
              title: 'Deletado com sucesso!',
              icon: 'success',
              confirmButtonText: 'Ok'
            });

            this.service.delete(obj.idCliente!).subscribe({
              next: retorno => {
      
                Swal.fire({
                  title: 'Deletado com sucesso!',
                  icon: 'success',
                  confirmButtonText: 'Ok'
                });
                
                if (obj.idCliente) {
                  this.logservice.logDeleteOperation(obj.idCliente, 'cliente', 'funcionario@hotmail.com').subscribe({
                    next: retorno => {
                      console.log('Log salvo com sucesso:', retorno);
                    },
                    error: erro => {
                      console.log('Erro ao registrar log de deleção:', erro);
                    }
                  });
                } else {
                  console.log('ID do cliente é inválido ou não encontrado.');
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
    this.objEdit = new Cliente(0,'Nome do Cliente','123.456.789-00','cliente@email.com','123',);
    this.modalRef = this.modalService.open(this.modalDetalhe);
  }

  edit(obj: Cliente) {
    this.objEdit = Object.assign({}, obj); 
    this.modalRef = this.modalService.open(this.modalDetalhe);
  }

  retornoDetalhe(obj: Cliente) {
    this.listAll();
    this.modalRef.close();
  }
}
