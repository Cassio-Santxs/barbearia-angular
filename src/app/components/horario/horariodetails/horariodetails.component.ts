import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Horario } from '../../../models/horario/horario';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { HorarioService } from '../../../services/horario/horario.service'; 
import { Funcionario } from '../../../models/funcionario/funcionario';
import { Cliente } from '../../../models/cliente/cliente';
import { ClienteService } from '../../../services/cliente/cliente.service';

@Component({
  selector: 'app-horariodetails',
  standalone: true,
  imports: [FormsModule, CommonModule, MdbFormsModule],
  templateUrl: './horariodetails.component.html',
  styleUrl: './horariodetails.component.scss'
})
export class HorariodetailsComponent {

  clienteObj: Cliente = new Cliente(
    0,
    '',
    '',
    '',
    ''
  );

  funcionarioObj: Funcionario = new Funcionario(
    1, 
    'Nome do Funcionário',
    true, 
    '123.456.789-00', 
    'funcionario@email.com',
    'senhaDoFuncionario'
  );

  @Input("obj") obj: Horario = new Horario(0, "", this.clienteObj, this.funcionarioObj, 20.00);
  @Output("retorno") retorno: EventEmitter<any> = new EventEmitter();

  funcionarioList: Funcionario[] = [];
  clienteList: Cliente[] = [];

  router2 = inject(ActivatedRoute);
  router = inject(Router);

  service = inject(HorarioService);
  clienteService = inject(ClienteService);

  constructor(){
    this.listAllClientes();

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
        alert(erro.status);
        console.log(erro);
        Swal.fire({
          title: 'Deu algum erro!',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    });
  }

  save(){
    if (this.obj.idHorario > 0) {
      this.service.update(this.obj).subscribe({
        next: retorno => {
          Swal.fire({
            title: 'Editado com sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok'
          });

          this.router.navigate(['admin/livros'], { state: { objNovo: this.obj } });
          this.retorno.emit(this.obj);
        },
        error: erro => {
          alert(erro.status);
          console.log(erro);
         
          Swal.fire({
            title: 'Deu algum erro!',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
      });
    } else {
      this.service.save(this.obj).subscribe({
        next: retorno => {
          Swal.fire({
            title: 'Salvo com sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok'
          });

          this.router.navigate(['admin/livros'], { state: { objNovo: this.obj } });
          this.retorno.emit(this.obj);
        },
        error: erro => {
          alert(erro.status);
          console.log(erro);
         
          Swal.fire({
            title: 'Deu algum erro!',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
      });
    }
  }

  listAllClientes(){
    this.clienteService.listAll().subscribe({
      next: lista => {
        console.log('b');
        this.clienteList = lista;
      },
      error: erro => {
        alert('Erro ao carregar listagem de registros!');
      }
    });
  }
}
