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

@Component({
  selector: 'app-clientedetails',
  standalone: true,
  imports: [FormsModule, CommonModule, MdbFormsModule, NgxMaskDirective, NgxMaskPipe],
  providers: [provideNgxMask()],
  templateUrl: './clientedetails.component.html',
  styleUrl: './clientedetails.component.scss'
})
export class ClientedetailsComponent {
  @Input("obj") obj: Cliente = new Cliente(1,'Nome do Cliente','123.456.789-00','cliente@email.com','senhaDoCliente');
  @Output("retorno") retorno: EventEmitter<any> = new EventEmitter();

  router2 = inject(ActivatedRoute);
  router = inject(Router);

  service = inject(ClienteService);

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
        alert(erro.status);
        console.log(erro);
        Swal.fire({
          title: 'Deu algum erro!',
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
      } );

      
    }else{

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
      } );
    }
  }
}
