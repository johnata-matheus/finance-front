import { Component } from '@angular/core';
import { HeaderComponent } from '../../features/home/components/header/header.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, ButtonComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
