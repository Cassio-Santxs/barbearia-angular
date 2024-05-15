import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MdbModalModule, MdbModalRef, MdbModalService, } from 'mdb-angular-ui-kit/modal';
import { AutoresdetailsComponent } from '../autoresdetails/autoresdetails.component';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import Swal from 'sweetalert2';
import { Autor } from '../../../models/autor'; 
import { AutorService } from '../../../services/autor/autor.service';

@Component({
  selector: 'app-editoraslist',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MdbModalModule,
    AutoresdetailsComponent,
    MdbAccordionModule
  ],
  templateUrl: './autoreslist.component.html',
  styleUrl: './autoreslist.component.scss',
})

export class AutoreslistComponent {
  modalService = inject(MdbModalService); 
  service = inject(AutorService);

  @ViewChild('modalDetalhe') modalDetalhe!: TemplateRef<any>; 

  modalRef!: MdbModalRef<any>; 

  lista: Autor[] = [];
  objEdit!: Autor;

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

  deleteById(obj: Autor) {
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
    this.objEdit = new Autor(0,"");
    this.modalRef = this.modalService.open(this.modalDetalhe);
  }

  edit(obj: Autor){
    this.objEdit = Object.assign({}, obj); 
    this.modalRef = this.modalService.open(this.modalDetalhe);
  }

  retornoDetalhe(obj: Autor){
    this.listAll();

    this.modalRef.close();
  }
}