import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './breadcrumbs.html',
})
export class BreadcrumbsComponent {
  
  // 🔥 Recibe un array de items [{ label: '', link?: '' }]
  items = input<{ label: string; link?: string }[]>([]);
}
