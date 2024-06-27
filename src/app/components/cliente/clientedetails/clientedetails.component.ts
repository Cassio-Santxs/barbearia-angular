import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Cliente } from '../../../models/cliente/cliente';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HorarioService } from '../../../services/horario/horario.service';
import { ClienteService } from '../../../services/cliente/cliente.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { from } from 'rxjs';
import { LoginService } from '../../../auth/login.service';

@Component({
  selector: 'app-clientedetails',
  standalone: true,
  imports: [FormsModule, CommonModule, MdbFormsModule, NgxMaskDirective, NgxMaskPipe],
  providers: [provideNgxMask()],
  templateUrl: './clientedetails.component.html',
  styleUrl: './clientedetails.component.scss'
})


export class ClientedetailsComponent {
  loginService = inject (LoginService);

  @Input("obj") obj: Cliente = new Cliente(0,'Nome do Cliente','123.456.789-00','cliente@email.com','senhaDoCliente');
  @Output("retorno") retorno: EventEmitter<any> = new EventEmitter();

  id: number = 0;
  router2 = inject(ActivatedRoute);
  router = inject(Router);

  service = inject(ClienteService);

  constructor(){
    const storedIdCliente = localStorage.getItem('idCliente');
    
    this.id = this.router2.snapshot.params['id'];
    
    if (storedIdCliente !== null && this.loginService.hasPermission("cliente")) {
      this.id = +storedIdCliente;
    } 

    if(this.id > 0){
      this.findById(this.id);
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

  save(){
    if(this.obj.idCliente! > 0){


      this.service.update(this.obj).subscribe({
        next: retorno => {

          Swal.fire({
            title: 'Editado com sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          var path = "admin/clientes"

          if(this.loginService.hasPermission("cliente"))
            path = "/perfil"
          
          this.router.navigate([path], { state: { objNovo: this.obj } });
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

      this.service.save(this.obj).subscribe({
        next: retorno => {

          Swal.fire({
            title: 'Salvo com sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok'
          });

          var path = "admin/clientes"

          if(this.loginService.hasPermission("cliente"))
            path = "/perfil"

          this.router.navigate([path], { state: { objNovo: this.obj } });
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
