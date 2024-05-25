import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Horario } from '../../../models/horario/horario';
import { Pagamento } from '../../../models/pagamento/pagamento';
import { FormaPagamento } from '../../../models/formaPagamento/forma-pagamento';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Cliente } from '../../../models/cliente/cliente';
import { Funcionario } from '../../../models/funcionario/funcionario';
import { FormaPagamentoService } from '../../../services/formaPagamento/forma-pagamento.service';
import { HorarioService } from '../../../services/horario/horario.service';
import { PagamentoService } from '../../../services/pagamento/pagamento.service';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-pagamentodetails',
  standalone: true,
  imports: [ FormsModule, CommonModule, MdbFormsModule],
  templateUrl: './pagamentodetails.component.html',
  styleUrl: './pagamentodetails.component.scss'
  
})
export class PagamentodetailsComponent {


  clienteObj: Cliente = new Cliente(
    0,
    '',
    '',
    '',
    ''
  );

  funcionarioObj: Funcionario = new Funcionario(
    0, 
    '',
    true, 
    '', 
    '',
    ''
  );
  horarioObj: Horario = new Horario(0, "", this.clienteObj, this.funcionarioObj, 20.00);


  formaPagamentoObj: FormaPagamento = new FormaPagamento(0,'Nome do Cliente'); 
  @Input("obj") obj: Pagamento = new Pagamento(0, "",this.horarioObj, this.formaPagamentoObj, "");
  @Output("retorno") retorno: EventEmitter<any> = new EventEmitter();

  formaPagamentoList: FormaPagamento[] = [];
  horarioList: Horario[] = [];

  router2 = inject(ActivatedRoute);
  router = inject(Router);

  service = inject(PagamentoService);
  formaPagamentoService = inject(FormaPagamentoService);
  horarioService = inject(HorarioService);

  constructor(){
    this.listAllFormaPagamento();
    this.listAllHorario();

    let id = this.router2.snapshot.params['id'];

    if(id > 0){
      this.findById(id);
    }
  }

   findById(id: number){
    this.service.findById(id).subscribe({
      next: data => {
        this.obj = data;
      },
      error: erro => {
        Swal.fire({
          title: 'Deu algum erro!',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    });
  }

  save(){
    if (this.obj.idPagamento! > 0) {
      this.service.update(this.obj).subscribe({
        next: retorno => {
          Swal.fire({
            title: 'Editado com sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok'
          });

          this.router.navigate(['admin/pagamento'], { state: { objNovo: this.obj } });
          this.retorno.emit(this.obj);
        },
        error: erro => {
          Swal.fire({
            title: 'Deu algum erro!',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
      });
    } else {
      this.service.save(this.obj).subscribe({
        next: retorno => {
          Swal.fire({
            title: 'Salvo com sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok'
          });

          this.router.navigate(['admin/pagamento'], { state: { objNovo: this.obj } });
          this.retorno.emit(this.obj);
        },
        error: erro => {
          Swal.fire({
            title: 'Deu algum erro!',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
      });
    }
  }

  listAllHorario(){
    this.horarioService.listAll().subscribe({
      next: lista => {
        this.horarioList = lista;
        debugger;
      },
      error: erro => {
        alert('Erro ao carregar listagem de registros!');
      }
    });
  }

  listAllFormaPagamento(){
    this.formaPagamentoService.listAll().subscribe({
      next: lista => {
        this.formaPagamentoList = lista;
      },
      error: erro => {
        alert('Erro ao carregar listagem de registros!');
      }
    });
  }

}
