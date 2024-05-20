import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Horario } from '../../../models/horario/horario';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { HorarioService } from '../../../services/horario/horario.service'; 

@Component({
  selector: 'app-horariodetails',
  standalone: true,
  imports: [FormsModule, CommonModule, MdbFormsModule],
  templateUrl: './horariodetails.component.html',
  styleUrl: './horariodetails.component.scss'
})
export class HorariodetailsComponent {

  @Input("obj") obj: Horario = new Horario(0, "");
  @Output("retorno") retorno: EventEmitter<any> = new EventEmitter();

  router2 = inject(ActivatedRoute);
  router = inject(Router);

  service = inject(HorarioService);

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
    if(this.obj.id > 0){


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
