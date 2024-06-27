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
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

@Component({
  selector: 'app-funcionariodetails',
  standalone: true,
  imports: [FormsModule, CommonModule, MdbFormsModule, NgxMaskDirective, NgxMaskPipe, MdbFormsModule],
  templateUrl: './funcionariodetails.component.html',
  styleUrl: './funcionariodetails.component.scss'
})
export class FuncionariodetailsComponent {
  @Input("obj") obj: Funcionario = new Funcionario(1,'Nome do funcionario', true, '123.456.789-00','funcionario@email.com','123');
  @Output("retorno") retorno: EventEmitter<any> = new EventEmitter();

  router2 = inject(ActivatedRoute);
  router = inject(Router);

  service = inject(FuncionarioService);

  constructor(){
    let id = this.router2.snapshot.params['id'];
    if(id > 0){
      this.findById(id);
    }
  }

   findById(id: number){


    this.service.findById(id).subscribe({
      next: data => {
        this.obj = data;
      },
      error: erro => {
        Swal.fire({
          title: erro.error.toString() ?? erro.message.toString(),
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    } );

  }

  salvar(){
    if(this.obj.idFuncionario! > 0){

      console.log(this.obj)
      this.service.update(this.obj).subscribe({
        next: retorno => {

          Swal.fire({
            title: 'Editado com sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          this.router.navigate(['admin/funcionario'], { state: { objNovo: this.obj } });
          this.retorno.emit(this.obj);
    
        },
        error: erro => {
          Swal.fire({
            title: erro.error.toString() ?? erro.message.toString(),
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
      } );

      
    }else{

      this.service.salvar(this.obj).subscribe({
        next: retorno => {

          Swal.fire({
            title: 'Salvo com sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          this.router.navigate(['admin/funcionario'], { state: { objNovo: this.obj } });
          this.retorno.emit(this.obj);

        },
        error: erro => {
          Swal.fire({
            title: erro.error.toString() ?? erro.message.toString(),
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
      } );
    }
  }
}