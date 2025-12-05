import { inject, Injectable, signal } from '@angular/core';
import { 
  Firestore, 
  collection, 
  collectionData, 
  addDoc, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  Timestamp 
} from '@angular/fire/firestore';
import { from, map, Observable, of } from 'rxjs';
import { AuthService } from '../../../core/services/firebase/auth';
import { Favorite } from '../interfaces/favorite';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private firestore = inject(Firestore);
  private authService = inject(AuthService);

  favorites = signal<Favorite[]>([]);
  loading = signal(false);

  /** AGREGAR FAVORITO */
  addFavorite(nombre: string, image: string, customName?: string): Observable<any> {
    const user = this.authService.currentUser();

    if (!user) {
      throw new Error('Usuario no autenticado');
    }

    const favorite: Omit<Favorite, 'id'> = {
      nombre,
      customName: customName || nombre,
      image,
      userId: user.uid,
      createdAt: new Date()
    };

    const favoritesCollection = collection(this.firestore, 'favorites');

    return from(
      addDoc(favoritesCollection, {
        ...favorite,
        createdAt: Timestamp.fromDate(favorite.createdAt)
      })
    );
  }

  /** OBTENER FAVORITOS (SIN getDocs!) */
  getFavorites(): Observable<Favorite[]> {
    const user = this.authService.currentUser();

    if (!user) return of([]);

    this.loading.set(true);

    const favoritesCollection = collection(this.firestore, 'favorites');
    const q = query(favoritesCollection, where('userId', '==', user.uid));

    return collectionData(q, { idField: 'id' }).pipe(
      map((data: any[]) => {
        const favorites = data.map(item => ({
          ...item,
          createdAt: item.createdAt?.toDate ? item.createdAt.toDate() : item.createdAt
        })) as Favorite[];

        this.favorites.set(favorites);
        this.loading.set(false);

        return favorites;
      })
    );
  }

  /** EDITAR FAVORITO */
  updateFavorite(id: string, customName: string): Observable<void> {
    const favoriteDoc = doc(this.firestore, 'favorites', id);
    return from(updateDoc(favoriteDoc, { customName }));
  }

  /** ELIMINAR FAVORITO */
  deleteFavorite(id: string): Observable<void> {
    const favoriteDoc = doc(this.firestore, 'favorites', id);
    return from(deleteDoc(favoriteDoc));
  }

  /** VERIFICAR SI YA ES FAVORITO */
  isFavorite(nombre: string): boolean {
    return this.favorites().some(fav => fav.nombre === nombre);
  }
}
