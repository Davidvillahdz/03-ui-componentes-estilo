import { inject, Injectable, signal } from '@angular/core';
import { 
  Auth, 
  authState, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  User, 
  GoogleAuthProvider, 
  signInWithPopup 
} from '@angular/fire/auth';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth: Auth = inject(Auth);

  /** Signal con el usuario actual */
  currentUser = signal<User | null>(null);

  /** Observable estable que escucha sesión */
  private authState$ = authState(this.auth);

  constructor() {

    // Mantener usuario sincronizado SIEMPRE
    this.authState$.subscribe(user => {
      this.currentUser.set(user);
    });
  }

  /** Registro */
  register(email: string, password: string): Observable<any> {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  /** Login normal */
  login(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  /** Login con Google */
  loginWithGoogle(): Observable<any> {
    const provider = new GoogleAuthProvider();

    // Evita error "cancelled-popup-request"
    (window as any).open('', '_self');

    return from(signInWithPopup(this.auth, provider));
  }

  /** Cerrar sesión */
  logout(): Observable<void> {
    return from(signOut(this.auth));
  }

  /** Saber si hay usuario */
  isAuthenticated(): boolean {
    return this.currentUser() !== null;
  }
}
