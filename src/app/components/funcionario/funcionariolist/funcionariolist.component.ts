import { CommonModule } from '@angular/common';
import { Component, TemplateRef, ViewChild, inject, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FuncionariodetailsComponent } from '../funcionariodetails/funcionariodetails.component';
import { Funcionario } from '../../../models/funcionario/funcionario'; 
import{ MdbModalModule, MdbModalRef, MdbModalService,} from "mdb-angular-ui-kit/modal";
import { FuncionarioService } from '../../../services/funcionario/funcionario.service';
import Swal from 'sweetalert2';
import { LogService } from '../../../services/log/log.service';

@Component({
  selector: 'app-funcionariolist',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, FuncionariodetailsComponent, MdbModalModule],
  templateUrl: './funcionariolist.component.html',
  styleUrl: './funcionariolist.component.scss'
})
export class FuncionariolistComponent {

  modalservice = inject(MdbModalService);
  service = inject(FuncionarioService);
  logservice = inject(LogService);
  @ViewChild("modalDetalhe") modalDetalhe!: TemplateRef<any>;

  modalRef!: MdbModalRef<any>;

  lista:Funcionario[] = []
  funcionarioEdit!: Funcionario;

  FuncionarioService = inject(FuncionarioService);

  constructor(){
    this.findAll();
  }

  findAll(){

    this.FuncionarioService.findAll().subscribe({
      next: lista => {
        this.lista = lista;

      },error: erro => {
        
        alert("ocorreu um erro");
      }
    })
  }

  novo(){
    this.funcionarioEdit = new Funcionario(0, 'Nome do Funcionário', true, '123.456.789-00', 'funcionario@email.com','123');
    this.modalRef = this.modalservice.open(this.modalDetalhe);
  }

  editar(obj: Funcionario){

    this.funcionarioEdit = Object.assign({}, obj);
    this.modalRef = this.modalservice.open(this.modalDetalhe);
  }
  deleteById(obj: Funcionario) {
    Swal.fire({
      title: 'Tem certeza que deseja deletar este registro?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(obj.idFuncionario!).subscribe({
          next: retorno => {
  
            Swal.fire({
              title: 'Deletado com sucesso!',
              icon: 'success',
              confirmButtonText: 'Ok'
            });

            if (obj.idFuncionario) {
              this.logservice.logDeleteOperation(obj.idFuncionario, 'funcionario', 'funcionario@hotmail.com').subscribe({
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

            this.findAll();
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

  retornoDetalhe(obj: Funcionario) {
    this.findAll();
    this.modalRef.close();
  }

}
