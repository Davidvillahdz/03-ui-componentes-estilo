import { Component, input } from '@angular/core';

@Component({
  selector: 'app-hero-simpsons',
  standalone: true,
  templateUrl: './hero-simpsons.html',
})
export class HeroSimpsonsComponent {
  
  //  Inputs obligatorios
  simpsonsCount = input.required<number>();
  totalPages = input.required<number>();

}
