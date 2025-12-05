import { Component, effect, inject, signal, untracked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { SimpsonsService } from '../simpsons/services/SimpsonsService';
import { PaginationService } from '../simpsons/services/PaginationService';
import { PaginationComponent } from "../simpsons/PaginationComponent/PaginationComponent";
import { toSignal, rxResource } from '@angular/core/rxjs-interop';
import { switchMap, map, of, catchError, tap } from 'rxjs';
import { HeroSimpsonsComponent } from "../simpsons/components/hero-simpsons/hero-simpsons";
import { BreadcrumbsComponent } from '../../shared/components/breadcrumbs/breadcrumbs';
import { AuthService as AuthFB } from '../../core/services/firebase/auth';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { FavoritesService } from '../simpsons/services/favorites';
import { Favorite } from '../simpsons/interfaces/favorite';


@Component({
  selector: 'app-simpsons-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    PaginationComponent,
    HeroSimpsonsComponent,
    BreadcrumbsComponent,
    ReactiveFormsModule
  ],
  templateUrl: './simpsons-page.html',
})

export class SimpsonsPageComponent {

  /** ------------------------ Servicios ------------------------ */
  private simpsonsService = inject(SimpsonsService);
  paginationService = inject(PaginationService);

  private favoritesService = inject(FavoritesService);
  private authService = inject(AuthFB);

  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);

  /** ------------------------ Señales para la API ------------------------ */

  simpsonsResource = toSignal(
    this.route.queryParamMap.pipe(
      map(params => Number(params.get('page')) || 1),
      switchMap(page => this.simpsonsService.getCharacters(page))
    ),
    { initialValue: null }
  );

  simpsonsCount = signal(0);
  totalPages = signal(0);

  /** ------------------------ Favoritos ------------------------ */

  private reloadFavoritesTrigger = signal(0);

  favoritesResource = rxResource({
    params: () => ({ reload: this.reloadFavoritesTrigger() }),
    stream: () => {
      const user = this.authService.currentUser();
      if (!user) return of([]);
      return this.favoritesService.getFavorites();
    }
  });

  favorites = () => this.favoritesResource.value() || [];
  loadingFavorites = this.favoritesResource.isLoading;

  /** ------------------------ Actions (Triggers) ------------------------ */

  private addFavoriteAction = signal<{ nombre: string; imagen: string } | null>(null);
  private deleteFavoriteAction = signal<string | null>(null);
  private updateFavoriteAction = signal<{ id: string; customName: string } | null>(null);

  /** ------------------------ Formularios ------------------------ */

  editingFavoriteId = signal<string | null>(null);
  editForm: FormGroup = this.fb.group({
    customName: ['', [Validators.required, Validators.minLength(2)]]
  });

  constructor() {

    /** ------------------------ Actualiza estadísticas ------------------------ */
    effect(() => {
      const data = this.simpsonsResource();
      if (!data) return;

      this.simpsonsCount.set(data.count ?? 0);

      const pages = Math.ceil((data.count ?? 0) / 10);
      this.totalPages.set(pages);
    });

    /** ------------------------ Recargar favoritos cuando el usuario inicia sesión ------------------------ */
    effect(() => {
      const user = this.authService.currentUser();
      if (user) {
        this.reloadFavoritesTrigger.update(v => v + 1);
      }
    });

    /** ------------------------ Side effects para favoritos ------------------------ */

    /* ADD */
    rxResource({
      params: () => this.addFavoriteAction(),
      stream: ({ params }) => {
        if (!params) return of(null);
        return this.favoritesService.addFavorite(params.nombre, params.imagen).pipe(
          tap(() => {
            untracked(() => {
              this.reloadFavoritesTrigger.update(v => v + 1);
              alert("¡Agregado a favoritos!");
            });
          }),
          catchError(() => of(null))
        );
      }
    });

    /* DELETE */
    rxResource({
      params: () => this.deleteFavoriteAction(),
      stream: ({ params }) => {
        if (!params) return of(null);
        return this.favoritesService.deleteFavorite(params).pipe(
          tap(() => {
            untracked(() => {
              this.reloadFavoritesTrigger.update(v => v + 1);
              alert("Eliminado de favoritos");
            });
          }),
          catchError(() => of(null))
        );
      }
    });

    /* UPDATE */
    rxResource({
      params: () => this.updateFavoriteAction(),
      stream: ({ params }) => {
        if (!params) return of(null);
        return this.favoritesService.updateFavorite(params.id, params.customName).pipe(
          tap(() => {
            untracked(() => {
              this.reloadFavoritesTrigger.update(v => v + 1);
              this.cancelEditingFavorite();
              alert("Nombre actualizado");
            });
          }),
          catchError(() => of(null))
        );
      }
    });

  }

  /** ------------------------ Métodos Favoritos ------------------------ */

  addToFavorites(character: any) {
    const nombre = character.name || character.character;
    const imagen = character.image || '';

    if (!nombre) {
      alert("No se encontró el nombre del personaje");
      return;
    }

    this.addFavoriteAction.set({ nombre, imagen });
  }

  removeFromFavorites(id: string) {
    if (confirm("¿Eliminar de favoritos?")) {
      this.deleteFavoriteAction.set(id);
    }
  }

  startEditingFavorite(fav: Favorite) {
    this.editingFavoriteId.set(fav.id!);
    this.editForm.patchValue({ customName: fav.customName });
  }

  saveEditedFavorite() {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }

    const id = this.editingFavoriteId();
    const customName = this.editForm.value.customName;

    if (id && customName) {
      this.updateFavoriteAction.set({ id, customName });
    }
  }

  cancelEditingFavorite() {
    this.editingFavoriteId.set(null);
    this.editForm.reset();
  }

  isFavorite(characterName: string): boolean {
    return this.favorites().some(f => f.nombre === characterName);
  }
}
