import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { Livro } from '../../../models/livro';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MdbModalModule, MdbModalRef, MdbModalService, } from 'mdb-angular-ui-kit/modal';
import { LivrosdetailsComponent } from '../livrosdetails/livrosdetails.component';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import Swal from 'sweetalert2';

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

  @ViewChild('modalDetalhe') modalDetalhe!: TemplateRef<any>; 

  modalRef!: MdbModalRef<any>; 

  lista: Livro[] = [];
  objEdit!: Livro;

  constructor() {
    this.findAll();
  }

  findAll() {
    let obj1 = new Livro();
    obj1.id = 1;
    obj1.nome = 'Dom Quixote';

    let obj2 = new Livro();
    obj2.id = 2;
    obj2.nome = 'Walden';

    let obj3 = new Livro();
    obj3.id = 3;
    obj3.nome = 'Meditações';

    this.lista.push(obj1);
    this.lista.push(obj2);
    this.lista.push(obj3);
  }

  new() {
    this.objEdit = new Livro();
    this.modalRef = this.modalService.open(this.modalDetalhe);
  }

  edit(obj: Livro) {
    this.objEdit = Object.assign({}, obj); 
    this.modalRef = this.modalService.open(this.modalDetalhe);
  }

  retornoDetalhe(obj: Livro) {
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

  deleteById(obj: Livro) {
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