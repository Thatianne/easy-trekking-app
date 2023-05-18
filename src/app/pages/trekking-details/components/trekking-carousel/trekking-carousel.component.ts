import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-trekking-carousel',
  templateUrl: './trekking-carousel.component.html',
  styleUrls: ['./trekking-carousel.component.scss']
})
export class TrekkingCarouselComponent {
  @Input() srcImages!: string[] | null;
}
