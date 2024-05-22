import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Funcionario } from '../../../models/funcionario/funcionario'; 
import { ActivatedRoute, Router } from '@angular/router';
import { state } from '@angular/animations';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import Swal from 'sweetalert2';

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

  @Input("obj") obj: Funcionario = new Funcionario(1, 
    'Nome do Funcionário',
    true, 
    '123.456.789-00', 
    'funcionario@email.com',
    'senhaDoFuncionario');
  @Output("retorno") retorno: EventEmitter<any> = new EventEmitter();

  Funcionarios: Funcionario = new Funcionario(1, 
    'Nome do Funcionário',
    true, 
    '123.456.789-00', 
    'funcionario@email.com',
    'senhaDoFuncionario');
  router = inject(ActivatedRoute);
  router2 = inject(Router);

  modalService = inject(MdbModalService);
  @ViewChild("modalFuncionarios") modalFuncionarios!: TemplateRef<any>;
  @ViewChild("modala") modala!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  salvar(){
    /*if(this.obj.idFuncionario! > 0){
      alert("salvo com sucesso");
      this.router2.navigate(["admin/funcionarios", {state: {funcionarionovo: this.obj}}])
      
    }*/

    Swal.fire("salvo com sucesso");
    this.retorno.emit(this.Funcionarios);
    this.router2.navigate(["/admin/funcionario"]);

  
  }
}
