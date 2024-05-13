import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MdbFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})

export class LoginComponent {
  dsLogin!: string;
  dsSenha!: string;

  router = inject(Router);

  logar() {
    if (this.dsLogin == 'admin' && this.dsSenha == '123') 
      this.router.navigate(['admin/']);
    else
      alert('Login ou senha incorretos');
  }
}