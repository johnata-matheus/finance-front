import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-google-auth',
  standalone: true,
  imports: [],
  templateUrl: './google-auth.component.html',
  styleUrl: './google-auth.component.scss'
})
export class GoogleAuthComponent {
  @Input() text: string = '';
}
