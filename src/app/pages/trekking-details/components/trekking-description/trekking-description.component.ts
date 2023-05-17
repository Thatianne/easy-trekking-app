import { Component, Input } from '@angular/core';
import { TrekkingDescription } from '@models/trekking';

@Component({
  selector: 'app-trekking-description',
  templateUrl: './trekking-description.component.html',
  styleUrls: ['./trekking-description.component.scss']
})
export class TrekkingDescriptionComponent {

  @Input() descriptions: TrekkingDescription[] = [];
}
