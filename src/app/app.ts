import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from "./features/daisyui-page/components/footer/footer";
import { Drawer } from "./features/daisyui-page/components/drawer/drawer";
import { BackToTopComponent } from "./shared/components/back-to-top/back-to-top";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, Drawer, BackToTopComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('03-ui-components-estilos');
}
