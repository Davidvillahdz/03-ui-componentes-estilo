import { Component, computed, effect, input, signal } from '@angular/core';
import { PaginationService } from '../../simpsons/services/PaginationService';
import { inject } from '@angular/core';

@Component({
  selector: 'app-pagination-component',
  standalone: true,
  templateUrl: './paginationcomponent.html',
})
export class PaginationComponent {

  pages = input(0);
  currentPage = input<number>(1);

  paginationService = inject(PaginationService);

  // 🔥 activePage YA NO ES linkedSignal
  activePage = signal(1);

  constructor() {
    // 🔥 Mantener activePage sincronizado con el input currentPage
    effect(() => {
      this.activePage.set(this.currentPage());
    });
  }

  // 🔥 Genera lista de páginas
  getPagesList = computed(() => {
    const total = this.pages();
    const current = this.activePage();

    if (total <= 5) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    let start = Math.max(1, current - 2);
    let end = Math.min(total, start + 4);

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  });

  // 🔥 Botón anterior
  previousPage() {
    if (this.activePage() > 1) {
      const newPage = this.activePage() - 1;
      this.activePage.set(newPage);
      this.paginationService.setPage(newPage);
    }
  }

  // 🔥 Botón siguiente
  nextPage() {
    if (this.activePage() < this.pages()) {
      const newPage = this.activePage() + 1;
      this.activePage.set(newPage);
      this.paginationService.setPage(newPage);
    }
  }

  // 🔥 Cambiar a una página específica
  goToPage(page: number) {
    this.activePage.set(page);
    this.paginationService.setPage(page);
  }
}
