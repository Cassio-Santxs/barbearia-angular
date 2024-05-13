import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Autor } from '../../../models/autor'; 
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';

@Component({
  selector: 'app-autoresdetails',
  standalone: true,
  imports: [FormsModule, CommonModule, MdbFormsModule],
  templateUrl: './autoresdetails.component.html',
  styleUrl: './autoresdetails.component.scss'
})

export class AutoresdetailsComponent {

  @Input("obj") obj: Autor = new Autor();
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