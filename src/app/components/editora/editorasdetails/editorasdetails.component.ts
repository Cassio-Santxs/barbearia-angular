import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Editora } from '../../../models/editora'; 
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';

@Component({
  selector: 'app-editorasdetails',
  standalone: true,
  imports: [FormsModule, CommonModule, MdbFormsModule],
  templateUrl: './editorasdetails.component.html',
  styleUrl: './editorasdetails.component.scss'
})

export class EditorasdetailsComponent {

  @Input("obj") obj: Editora = new Editora();
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