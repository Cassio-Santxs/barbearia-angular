import { CommonModule } from '@angular/common';
import { Component, TemplateRef, ViewChild, inject, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FuncionariodetailsComponent } from '../funcionariodetails/funcionariodetails.component';
import { Funcionario } from '../../../models/funcionario/funcionario'; 
import{ MdbModalModule, MdbModalRef, MdbModalService,} from "mdb-angular-ui-kit/modal";
import { FuncionarioService } from '../../../services/funcionario/funcionario.service';

@Component({
  selector: 'app-funcionariolist',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, FuncionariodetailsComponent, MdbModalModule],
  templateUrl: './funcionariolist.component.html',
  styleUrl: './funcionariolist.component.scss'
})
export class FuncionariolistComponent {

  modalservice = inject(MdbModalService);
  service = inject(FuncionarioService);

  @ViewChild("modalDetalhe") modalDetalhe!: TemplateRef<any>;

  modalRef!: MdbModalRef<any>;

  lista:Funcionario[] = []
  funcionarioEdit!: Funcionario;

  FuncionarioService = inject(FuncionarioService);

  constructor(){

    this.findAll();

  }

  findAll(){

    this.FuncionarioService.findAll().subscribe({
      next: lista => {
        console.log("teste");
        this.lista = lista;

      },error: erro => {
        
        alert("ocorreu um erro");
      }
    })
  }

  novo(){
    this.funcionarioEdit = new Funcionario(0, 
      'Nome do Funcionário',
      true, 
      '123.456.789-00', 
      'funcionario@email.com',
      'senhaDoFuncionario');
    this.modalRef = this.modalservice.open(this.modalDetalhe);
  }
  editar(obj: Funcionario){

    this.funcionarioEdit = Object.assign({}, obj);
    this.modalRef = this.modalservice.open(this.modalDetalhe);
  }
  deletar(){
      
  }
}
