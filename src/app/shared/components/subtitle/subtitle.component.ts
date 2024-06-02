import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-subtitle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subtitle.component.html',
  styleUrl: './subtitle.component.scss'
})
export class SubtitleComponent {
  @Input() subtitle: string = '';
  @Input() secundarySubtitle: boolean = false;
}
