import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() text: string = '';
  @Input() secundary: boolean = false;
  @Input() btnDelete: boolean = false;
  @Input() showImage: boolean = false;
  @Input() pathImage: string = '';
}
