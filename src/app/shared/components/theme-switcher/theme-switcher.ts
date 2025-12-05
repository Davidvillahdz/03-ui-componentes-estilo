import { Component, signal } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [CommonModule, TitleCasePipe],
  templateUrl: './theme-switcher.html',
})
export class ThemeSwitcher {
  // DaisyUI themes
  themes = ['light', 'dark', 'cyberpunk']; // <-- cambié abyss por cyberpunk

  // Tema actual reactivo
  currentTheme = signal<string>(this.loadTheme());

  // Cargar tema desde localStorage o desde el HTML
  private loadTheme(): string {
    const saved = localStorage.getItem('app-theme');
    return saved ?? this.getCurrentTheme();
  }

  // Obtiene el tema actual desde el atributo HTML
  private getCurrentTheme(): string {
    return document.documentElement.getAttribute('data-theme') ?? 'light';
  }

  // Cambiar tema, aplicarlo y guardarlo
  setTheme(theme: string): void {
    document.documentElement.setAttribute('data-theme', theme);
    this.currentTheme.set(theme);
    localStorage.setItem('app-theme', theme); // <-- persistencia real
  }

  // Aplicar el tema al inicializar el componente
  constructor() {
    const theme = this.currentTheme();
    document.documentElement.setAttribute('data-theme', theme);
  }
}
