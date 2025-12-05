import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-back-to-top',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './back-to-top.html',
})
export class BackToTopComponent {

  // Signal para controlar visibilidad
  isVisible = signal(false);

  // Detectar scroll
  @HostListener('window:scroll', [])
  onScroll() {
    this.isVisible.set(window.scrollY > 300);
  }

  // Acción para volver al inicio
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
