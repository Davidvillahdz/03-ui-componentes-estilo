import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-code',
  imports: [],
  templateUrl: './code.html',
  styleUrl: './code.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Code { }
