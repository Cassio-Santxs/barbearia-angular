import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MdbModalModule, MdbModalRef, MdbModalService, } from 'mdb-angular-ui-kit/modal';
import { AutoresdetailsComponent } from '../autoresdetails/autoresdetails.component';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import Swal from 'sweetalert2';
import { Autor } from '../../../models/autor'; 

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

  @ViewChild('modalDetalhe') modalDetalhe!: TemplateRef<any>; 

  modalRef!: MdbModalRef<any>; 

  lista: Autor[] = [];
  objEdit!: Autor;

  constructor() {
    this.findAll();
  }

  findAll() {
    let obj1 = new Autor();
    obj1.id = 1;
    obj1.nome = 'Autor 1';

    let obj2 = new Autor();
    obj2.id = 2;
    obj2.nome = 'Autor 2';

    let obj3 = new Autor();
    obj3.id = 3;
    obj3.nome = 'Autor 3';

    this.lista.push(obj1);
    this.lista.push(obj2);
    this.lista.push(obj3);
  }

  new() {
    this.objEdit = new Autor();
    this.modalRef = this.modalService.open(this.modalDetalhe);
  }

  edit(obj: Autor) {
    this.objEdit = Object.assign({}, obj); 
    this.modalRef = this.modalService.open(this.modalDetalhe);
  }

  retornoDetalhe(obj: Autor) {
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

  deleteById(obj: Autor) {
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