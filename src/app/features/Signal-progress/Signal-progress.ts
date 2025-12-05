import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-signal-progress',
  imports: [],
  templateUrl: './Signal-progress.html',
  styleUrl: './Signal-progress.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalProgress {
progreso = signal(0);

actualizarProgreso(event: Event) {
const input =event.target as HTMLInputElement;
this.progreso.set(Number(input.value));
}

}
