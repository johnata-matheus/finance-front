import { Component } from '@angular/core';
import { HeaderAuthComponent } from '../components/header-auth/header-auth.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot',
  standalone: true,
  imports: [HeaderAuthComponent, ButtonComponent, RouterLink],
  templateUrl: './forgot.component.html',
  styleUrl: './forgot.component.scss'
})
export class ForgotComponent {

}
