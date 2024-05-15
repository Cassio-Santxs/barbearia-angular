import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { Livro } from '../../../models/livro';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MdbModalModule, MdbModalRef, MdbModalService, } from 'mdb-angular-ui-kit/modal';
import { LivrosdetailsComponent } from '../livrosdetails/livrosdetails.component';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import Swal from 'sweetalert2';
import { LivroService } from '../../../services/livro/livro.service';

@Component({
  selector: 'app-livroslist',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MdbModalModule,
    LivrosdetailsComponent,
    MdbAccordionModule
  ],
  templateUrl: './livroslist.component.html',
  styleUrl: './livroslist.component.scss',
})

export class LivroslistComponent {
  modalService = inject(MdbModalService); 
  service = inject(LivroService);

  @ViewChild('modalDetalhe') modalDetalhe!: TemplateRef<any>; 

  modalRef!: MdbModalRef<any>; 

  lista: Livro[] = [];
  objEdit!: Livro;

  constructor() {
    this.listAll();
  }

  listAll(){
      this.service.listAll().subscribe({
        next: lista => {
          console.log('b');
          this.lista = lista;
        },
        error: erro => {
          alert('Erro ao carregar listagem de registros!');
        }
      });
  }

  deleteById(obj: Livro) {
    Swal.fire({
      title: 'Tem certeza que deseja deletar este registro?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(obj.id).subscribe({
          next: retorno => {
  
            Swal.fire({
              title: 'Deletado com sucesso!',
              icon: 'success',
              confirmButtonText: 'Ok'
            });
            this.listAll();
          },
          error: erro => {
  
            alert(erro.status);
            console.log(erro);
           
            Swal.fire({
              title: 'ERRO!',
              icon: 'error',
              confirmButtonText: 'Ok'
            });
          }
        });
      }
    });
  }

  new(){
    this.objEdit = new Livro(0,"");
    this.modalRef = this.modalService.open(this.modalDetalhe);
  }

  edit(obj: Livro){
    this.objEdit = Object.assign({}, obj); 
    this.modalRef = this.modalService.open(this.modalDetalhe);
  }

  retornoDetalhe(obj: Livro){
    this.listAll();

    this.modalRef.close();
  }
}