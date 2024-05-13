import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Livro } from '../../../models/livro';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';

@Component({
  selector: 'app-livrosdetails',
  standalone: true,
  imports: [FormsModule, CommonModule, MdbFormsModule],
  templateUrl: './livrosdetails.component.html',
  styleUrl: './livrosdetails.component.scss'
})

export class LivrosdetailsComponent {

  @Input("obj") obj: Livro = new Livro();
  @Output("retorno") retorno: EventEmitter<any> = new EventEmitter();

  router = inject(Router);

  constructor(){
  }

  save(){
    Swal.fire('Registro salvo com sucesso!', '', 'success');

    this.retorno.emit(this.obj);  
    this.router.navigate(['admin/carros']);
  }
}