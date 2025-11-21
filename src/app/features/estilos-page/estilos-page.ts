import { Component, signal } from '@angular/core';
import { SignalBoxComponent } from '../SignalBoxComponent/SignalBoxComponent';
import { SignalProgress } from "../Signal-progress/Signal-progress";
@Component({
  selector: 'app-estilos-page',
  imports: [SignalBoxComponent, SignalProgress],
  templateUrl: './estilos-page.html',
  styleUrl: './estilos-page.css',
})
export class EstilosPage {

}
