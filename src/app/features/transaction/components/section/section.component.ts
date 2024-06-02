import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss'
})
export class SectionComponent {

}
