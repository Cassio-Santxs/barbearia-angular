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
import { FuncionarioService } from '../../../services/funcionario/funcionario.service';
import { LoginService } from '../../../auth/login.service';
import { LogService } from '../../../services/log/log.service';

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
    '',
  
  );

  funcionarioObj: Funcionario = new Funcionario(
    0, 
    '',
    true, 
    '', 
    '',
    ''
  );

  @Input("obj") obj: Horario = new Horario(0, "", this.clienteObj, this.funcionarioObj, 20.00);
  @Input("objAux") objAux: Horario = new Horario(0, "", this.clienteObj, this.funcionarioObj, 20.00);
  @Output("retorno") retorno: EventEmitter<any> = new EventEmitter();

  funcionarioList: Funcionario[] = [];
  clienteList: Cliente[] = [];

  router2 = inject(ActivatedRoute);
  router = inject(Router);

  service = inject(HorarioService);
  loginService = inject(LoginService);
  clienteService = inject(ClienteService);
  funcionaroService = inject(FuncionarioService);
  logservice = inject(LogService);
  constructor(){
    this.listAllClientes();
    this.listAllFuncionarios();

    let id = this.router2.snapshot.params['id'];

    if(id > 0){
      this.findById(id);
    }
  }
  ngOnInit(): void {
    this.objAux = structuredClone(this.obj);
  }
   findById(id: number){
    this.service.findById(id).subscribe({
      next: data => {
        this.obj = data;
      },
      error: erro => {
        Swal.fire({
          title: erro.error ? erro.error.toString()  : erro.message.toString(),
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    });
  }

  save(){
    this.obj.cliente.role = "cliente";
    if (this.obj.idHorario > 0) {
      this.service.update(this.obj).subscribe({
        next: retorno => {
          Swal.fire({
            title: 'Editado com sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          
          if (this.obj.idHorario) {
            this.logservice.compareAndLogDifferences(this.obj, this.objAux, 'horario', 'funcionario@hotmail.com').subscribe({
              next: retorno => {
                console.log('Log salvo com sucesso:', retorno);
              },
              error: erro => {
                console.log('Erro ao registrar log de deleção:', erro);
              }
            });
          } else {
            console.log('ID é inválido ou não encontrado.');
          }


          this.router.navigate(['admin/horarios'], { state: { objNovo: this.obj } });
          this.retorno.emit(this.obj);
        },
        error: erro => {
          Swal.fire({
            title: erro.error ? erro.error.toString()  : erro.message.toString(),
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

          this.logservice.logInsertOperation(0, 'horario', 'funcionario@hotmail.com').subscribe({
            next: retorno => {
              console.log('Log salvo com sucesso:', retorno);
            },
            error: erro => {
              console.log('Erro ao registrar log de deleção:', erro);
            }
          });

          this.router.navigate(['admin/horarios'], { state: { objNovo: this.obj } });
          this.retorno.emit(this.obj);
        },
        error: erro => {
          Swal.fire({
            title: erro.error ? erro.error.toString()  : erro.message.toString(),
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
        this.clienteList = lista;
        const storedIdCliente = localStorage.getItem('idCliente');

        if (storedIdCliente !== null && this.loginService.hasPermission("cliente")) {
          this.clienteList = this.clienteList.filter(x => x.idCliente == Number(storedIdCliente));

          this.clienteObj = this.clienteList[0];

          this.obj.cliente = this.clienteObj;
        } 
      },
      error: erro => {
        Swal.fire({
          title: erro.error ? erro.error.toString()  : erro.message.toString(),
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    });
  }

  listAllFuncionarios(){
    this.funcionaroService.findAll().subscribe({
      next: lista => {
        this.funcionarioList = lista;
      },
      error: erro => {
        Swal.fire({
          title: erro.error ? erro.error.toString()  : erro.message.toString(),
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    });
  }
}
