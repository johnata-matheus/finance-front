import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-auth',
  standalone: true,
  imports: [],
  templateUrl: './header-auth.component.html',
  styleUrl: './header-auth.component.scss'
})
export class HeaderAuthComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
}
