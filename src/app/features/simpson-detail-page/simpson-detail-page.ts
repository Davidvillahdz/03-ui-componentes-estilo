import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { toSignal } from "@angular/core/rxjs-interop";
import { map, switchMap } from "rxjs";
import { SimpsonsService } from "../simpsons/services/SimpsonsService";

@Component({
  selector: 'app-simpson-detail-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './simpson-detail-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpsonDetailPageComponent {
  private route = inject(ActivatedRoute);
  private service = inject(SimpsonsService);

  personaje = toSignal(
    this.route.paramMap.pipe(
      map(params => +params.get('id')!),
      switchMap(id => this.service.getCharacterById(id))
    ),
    { initialValue: null }
  );
}