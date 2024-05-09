import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [MenuComponent, RouterOutlet],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.scss'
})
export class PrincipalComponent {

}
