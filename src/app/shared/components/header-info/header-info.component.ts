import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header-info.component.html',
  styleUrl: './header-info.component.scss'
})
export class HeaderInfoComponent {
  @Input() location: string = '';
  @Input() isActive: boolean = false;
  @Input() view: boolean = true;
}
