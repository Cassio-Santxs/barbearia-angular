import { Component, Input, inject } from '@angular/core';
import { LoginService } from '../../../auth/login.service';
import { CommonModule } from '@angular/common';
import { ClienteService } from '../../../services/cliente/cliente.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  loginService = inject (LoginService);
}
