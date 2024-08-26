import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { Horario } from '../../../models/horario/horario'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MdbModalModule, MdbModalRef, MdbModalService, } from 'mdb-angular-ui-kit/modal';
import { HorariodetailsComponent } from '../horariodetails/horariodetails.component';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import Swal from 'sweetalert2';
import { HorarioService } from '../../../services/horario/horario.service';
import { Cliente } from '../../../models/cliente/cliente';
import { Funcionario } from '../../../models/funcionario/funcionario';
import { LoginService } from '../../../auth/login.service';
import { LogService } from '../../../services/log/log.service';

@Component({
  selector: 'app-horariolist',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MdbModalModule,
    HorariodetailsComponent,
    MdbAccordionModule
  ],
  templateUrl: './horariolist.component.html',
  styleUrl: './horariolist.component.scss'
})
export class HorariolistComponent {
  modalService = inject(MdbModalService); 
  service = inject(HorarioService);
  loginService = inject(LoginService);
  logservice = inject(LogService);
  @ViewChild('modalDetalhe') modalDetalhe!: TemplateRef<any>; 

  modalRef!: MdbModalRef<any>; 

  lista: Horario[] = [];
  objEdit!: Horario;

  constructor() {
    if(this.loginService.hasPermission("admin"))
      this.listAll();
    else {
      this.listAllByCliente();
    }
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

  listAllByCliente(){
    const storedIdCliente = localStorage.getItem('idCliente');
    this.service.findByIdCliente(Number("0" + storedIdCliente)).subscribe({
      next: lista => {
        this.lista = lista;
      },
      error: erro => {
        alert('Erro ao carregar listagem de registros!');
      }
    });
}

  deleteById(obj: Horario) {
    Swal.fire({
      title: 'Tem certeza que deseja deletar este registro?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(obj.idHorario).subscribe({
          next: retorno => {
  
            Swal.fire({
              title: 'Deletado com sucesso!',
              icon: 'success',
              confirmButtonText: 'Ok'
            });

            if (obj.idHorario) {
              this.logservice.logDeleteOperation(obj.idHorario, 'horario', 'funcionario@hotmail.com').subscribe({
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
    let cliente: Cliente = new Cliente(
      0,
      'Nome do Cliente',
      '123.456.789-00',
      'cliente@email.com',
      'senhaDoCliente',
    );
  
    let funcionario: Funcionario = new Funcionario(
      0, 
      'Nome do Funcionário',
      true, 
      '123.456.789-00', 
      'funcionario@email.com',
      'senhaDoFuncionario'
    );
    
    this.objEdit = new Horario(0, "", cliente, funcionario, 20.00);
    this.modalRef = this.modalService.open(this.modalDetalhe);
  }

  edit(obj: Horario) {
    this.objEdit = Object.assign({}, obj); 
    this.modalRef = this.modalService.open(this.modalDetalhe);
  }

  retornoDetalhe(obj: Horario) {
    this.listAll();
    this.modalRef.close();
  }
}
