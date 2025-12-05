import { Injectable, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class PaginationService {

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  /** 🔥 Signal de la página actual (reactiva y real) */
  page = signal(1);

  constructor() {
    // 🔥 Escuchar SIEMPRE los cambios en los queryParams
    this.route.queryParamMap.subscribe(params => {
      const pageParam = Number(params.get('page')) || 1;
      this.page.set(pageParam);
    });
  }

  /** Getter seguro */
  currentPage = () => this.page();

  /** 🔥 Cambia directamente la página en la URL */
  setPage(page: number) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page },
      queryParamsHandling: 'merge'
    });
  }
}
