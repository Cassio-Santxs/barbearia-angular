import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { Cliente } from '../../models/cliente/cliente';
import Swal from 'sweetalert2';
import { ClienteService } from '../../services/cliente/cliente.service';
import { MenuComponent } from '../layout/menu/menu.component';
import { ClientedetailsComponent } from '../cliente/clientedetails/clientedetails.component';
import { LoginService } from '../../auth/login.service';

@Component({
  selector: 'app-perfil-cliente',
  standalone: true,
  imports: [MenuComponent, RouterOutlet, ClientedetailsComponent],
  templateUrl: './perfil-cliente.component.html',
  styleUrl: './perfil-cliente.component.scss'
})
export class PerfilClienteComponent {
  router2 = inject(ActivatedRoute);
  router = inject(Router);
  service = inject(ClienteService);
  id: number = 0;

  obj: Cliente = new Cliente(
    0,
    '',
    '',
    '',
    '',
  
  );

  constructor(){
    const storedIdCliente = localStorage.getItem('idCliente');

    this.id = 0;

    if (storedIdCliente !== null) {
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
          title: erro.error ? erro.error.toString()  : erro.message.toString(),
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    });
  }

}
