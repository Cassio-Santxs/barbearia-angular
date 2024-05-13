import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MdbModalModule, MdbModalRef, MdbModalService, } from 'mdb-angular-ui-kit/modal';
import { EditorasdetailsComponent } from '../editorasdetails/editorasdetails.component'; 
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import Swal from 'sweetalert2';
import { Editora } from '../../../models/editora';

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

  @ViewChild('modalDetalhe') modalDetalhe!: TemplateRef<any>; 

  modalRef!: MdbModalRef<any>; 

  lista: Editora[] = [];
  objEdit!: Editora;

  constructor() {
    this.findAll();
  }

  findAll() {
    let obj1 = new Editora();
    obj1.id = 1;
    obj1.nome = 'Editora 1';

    let obj2 = new Editora();
    obj2.id = 2;
    obj2.nome = 'Editora 2';

    let obj3 = new Editora();
    obj3.id = 3;
    obj3.nome = 'Editora 3';

    this.lista.push(obj1);
    this.lista.push(obj2);
    this.lista.push(obj3);
  }

  new() {
    this.objEdit = new Editora();
    this.modalRef = this.modalService.open(this.modalDetalhe);
  }

  edit(obj: Editora) {
    this.objEdit = Object.assign({}, obj); 
    this.modalRef = this.modalService.open(this.modalDetalhe);
  }

  retornoDetalhe(obj: Editora) {
    if (this.objEdit.id > 0) {
      let indice = this.lista.findIndex((o) => {
        return o.id == this.objEdit.id;
      });

      this.lista[indice] = obj;
    } else {
      obj.id = 55;

      this.lista.push(obj);
    }

    this.modalRef.close();
  }

  deleteById(obj: Editora) {
    Swal.fire({
      title: 'Deseja realmente deletar este objeto?',
      showDenyButton: true,
      confirmButtonText: 'Sim',
      denyButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {
        let indice = this.lista.findIndex((o) => {
          return o.id == obj.id;
        });

        this.lista.splice(indice, 1);

        Swal.fire('Registro deletado com sucesso!', '', 'success')
      }
    })
  }
}