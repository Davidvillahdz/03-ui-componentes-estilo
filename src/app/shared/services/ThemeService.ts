import { Injectable } from '@angular/core';

const THEME_KEY = 'app-theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() {}

  // Guardar tema en localStorage
  saveTheme(theme: string): void {
    localStorage.setItem(THEME_KEY, theme);
    this.applyTheme(theme);
  }

  // Obtener tema guardado
  getTheme(): string {
    return localStorage.getItem(THEME_KEY) || 'light';
  }

  // Aplicar tema al <html data-theme="">
  applyTheme(theme: string): void {
    document.documentElement.setAttribute('data-theme', theme);
  }
}
