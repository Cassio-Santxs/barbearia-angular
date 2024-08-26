import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormaPagamento } from '../../../models/formaPagamento/forma-pagamento';
import { ActivatedRoute, Router } from '@angular/router';
import { FormaPagamentoService } from '../../../services/formaPagamento/forma-pagamento.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { LogService } from '../../../services/log/log.service';

@Component({
  selector: 'app-forma-pagamentodetails',
  standalone: true,
  imports: [FormsModule, CommonModule, MdbFormsModule],
  templateUrl: './forma-pagamentodetails.component.html',
  styleUrl: './forma-pagamentodetails.component.scss'
})
export class FormaPagamentodetailsComponent {

  @Input("obj") obj: FormaPagamento = new FormaPagamento(0,'');
  @Input("objAux") objAux: FormaPagamento = new FormaPagamento(0,'');
  @Output("retorno") retorno: EventEmitter<any> = new EventEmitter();

  router2 = inject(ActivatedRoute);
  router = inject(Router);

  service = inject(FormaPagamentoService);
  logservice = inject(LogService);
  constructor(){
    let id = this.router2.snapshot.params['id'];
    if(id > 0){
      this.findById(id);
    }
  }

  ngOnInit(): void {
    this.objAux = structuredClone(this.obj);
  }

   findById(id: number){


    this.service.findById(id).subscribe({
      next: data => {
        this.obj = data;
      },
      error: erro => {
        Swal.fire({
          title: erro.error ? erro.error.toString()  : erro.message.toString(),
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    } );

  }

  
  save(){
    if(this.obj.idFormaPagto! > 0){

      console.log(this.obj)
      this.service.update(this.obj).subscribe({
        next: retorno => {

          Swal.fire({
            title: 'Editado com sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok'
          });

          if (this.obj.idFormaPagto) {
            this.logservice.compareAndLogDifferences(this.obj, this.objAux, 'forma_pagamento', 'funcionario@hotmail.com').subscribe({
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

          this.router.navigate(['admin/formaPagamento'], { state: { objNovo: this.obj } });
          this.retorno.emit(this.obj);
    
        },
        error: erro => {
          Swal.fire({
            title: erro.error ? erro.error.toString()  : erro.message.toString(),
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
      } );

      
    }else{

      this.service.save(this.obj).subscribe({
        next: retorno => {

          Swal.fire({
            title: 'Salvo com sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok'
          });

          this.logservice.logInsertOperation(0, 'forma_pagamento', 'funcionario@hotmail.com').subscribe({
            next: retorno => {
              console.log('Log salvo com sucesso:', retorno);
            },
            error: erro => {
              console.log('Erro ao registrar log de deleção:', erro);
            }
          });

          this.router.navigate(['admin/formaPagamento'], { state: { objNovo: this.obj } });
          this.retorno.emit(this.obj);

        },
        error: erro => {
          Swal.fire({
            title: erro.error ? erro.error.toString()  : erro.message.toString(),
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
      } );
    }
  }

}
