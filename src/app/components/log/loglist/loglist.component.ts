import { CommonModule } from '@angular/common';
import { Component, TemplateRef, ViewChild, inject, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LogdetailsComponent } from '../logdetails/logdetails.component';
import { Log } from '../../../models/log/log'; 
import{ MdbModalModule, MdbModalRef, MdbModalService,} from "mdb-angular-ui-kit/modal";
import { LogService } from '../../../services/log/log.service'; 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-loglist',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, LogdetailsComponent, MdbModalModule],
  templateUrl: './loglist.component.html',
  styleUrl: './loglist.component.scss'
})
export class LoglistComponent {

  modalservice = inject(MdbModalService);
  service = inject(LogService);

  @ViewChild("modalDetalhe") modalDetalhe!: TemplateRef<any>;

  modalRef!: MdbModalRef<any>;

  lista:Log[] = []
  logEdit!: Log;

  LogService = inject(LogService);

  constructor(){
    this.findAll();
  }

  findAll(){
    this.LogService.findAll().subscribe({
      next: lista => {
        this.lista = lista;
      },error: erro => {
        
        alert("ocorreu um erro");
      }
    })
  }

  novo(){
    this.logEdit = new Log(0, '', '', '', '', '', '');
    this.modalRef = this.modalservice.open(this.modalDetalhe);
  }

  editar(obj: Log){
    this.logEdit = Object.assign({}, obj);
    this.modalRef = this.modalservice.open(this.modalDetalhe);
  }

  deleteById(obj: Log) {
    Swal.fire({
      title: 'Tem certeza que deseja deletar este registro?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(obj.idLog!).subscribe({
          next: retorno => {
  
            Swal.fire({
              title: 'Deletado com sucesso!',
              icon: 'success',
              confirmButtonText: 'Ok'
            });
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

  retornoDetalhe(obj: Log) {
    this.findAll();
    this.modalRef.close();
  }

}
