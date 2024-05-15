import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MdbModalModule, MdbModalRef, MdbModalService, } from 'mdb-angular-ui-kit/modal';
import { EditorasdetailsComponent } from '../editorasdetails/editorasdetails.component'; 
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import Swal from 'sweetalert2';
import { Editora } from '../../../models/editora';
import { EditoraService } from '../../../services/editora/editora.service';

@Component({
  selector: 'app-editoraslist',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MdbModalModule,
    EditorasdetailsComponent,
    MdbAccordionModule
  ],
  templateUrl: './editoraslist.component.html',
  styleUrl: './editoraslist.component.scss',
})

export class EditoraslistComponent {
  modalService = inject(MdbModalService); 
  service = inject(EditoraService);

  @ViewChild('modalDetalhe') modalDetalhe!: TemplateRef<any>; 

  modalRef!: MdbModalRef<any>; 

  lista: Editora[] = [];
  objEdit!: Editora;

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

  deleteById(obj: Editora) {
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
    this.objEdit = new Editora(0,"");
    this.modalRef = this.modalService.open(this.modalDetalhe);
  }

  edit(obj: Editora){
    this.objEdit = Object.assign({}, obj); 
    this.modalRef = this.modalService.open(this.modalDetalhe);
  }

  retornoDetalhe(obj: Editora){
    this.listAll();

    this.modalRef.close();
  }
}