import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Funcionario } from '../../../models/funcionario/funcionario'; 
import { ActivatedRoute, Router } from '@angular/router';
import { state } from '@angular/animations';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import Swal from 'sweetalert2';
import { FuncionarioService } from '../../../services/funcionario/funcionario.service';

@Component({
  selector: 'app-funcionariodetails',
  standalone: true,
  imports: [FormsModule, CommonModule, MdbFormsModule],
  templateUrl: './funcionariodetails.component.html',
  styleUrl: './funcionariodetails.component.scss'
})
export class FuncionariodetailsComponent {

  constructor(){
    
  }

  @Input("obj") obj: Funcionario = new Funcionario(1, 'Nome do Funcionário', true, '123.456.789-00', 'funcionario@email.com', 'senhaDoFuncionario');
  @Output("retorno") retorno: EventEmitter<any> = new EventEmitter();

  Funcionarios: Funcionario = new Funcionario(1, 'Nome do Funcionário', true, '123.456.789-00', 'funcionario@email.com', 'senhaDoFuncionario');

  router = inject(ActivatedRoute);
  router2 = inject(Router);

  service = inject(FuncionarioService);

  salvar(){
    if(this.obj.idFuncionario! > 0){
      this.service.update(this.obj).subscribe({
        next: retorno => {
          Swal.fire({
            title: 'Editado com sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok'
          });

          this.router2.navigate(['admin/funcionario'], { state: { objNovo: this.obj } });
          this.retorno.emit(this.obj);
        },
        error: erro => {
          Swal.fire({
            title: 'Deu algum erro!',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
      } );
    } else {
      this.service.salvar(this.obj).subscribe({
        next: retorno => {
          Swal.fire({
            title: 'Salvo com sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok'
          });

          this.router2.navigate(['admin/funcionario'], { state: { objNovo: this.obj } });
          this.retorno.emit(this.obj);
        },
        error: erro => {
          debugger;
          Swal.fire({
            title: 'Deu algum erro!',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
      } );
    }
  }
}
