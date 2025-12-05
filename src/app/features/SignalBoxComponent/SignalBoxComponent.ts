import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-signal-box-component',
  imports: [],
  templateUrl: './SignalBoxComponent.html',
  styleUrl: './SignalBoxComponent.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalBoxComponent {
  valor = signal<number>(0);

  cambiarValor(event: Event) {
    const input = event.target as HTMLInputElement;
    const nuevoValor = Number(input.value);
    this.valor.set(nuevoValor);
    }
  
 }
