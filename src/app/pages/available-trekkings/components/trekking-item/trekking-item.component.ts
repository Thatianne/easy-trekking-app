import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Trekking } from '@models/trekking';
import { TrekkingImage } from '@models/trekking-image';
import { difficultLevelClass } from '@pages/trekking-details/constants/difficult-level-class';
import { difficultLevelLabel } from '@pages/trekking-details/constants/difficult-level-label';
import { DifficultLevelEnum } from 'src/app/enums/difficult-level.enum';

@Component({
  selector: 'app-trekking-item',
  templateUrl: './trekking-item.component.html',
  styleUrls: ['./trekking-item.component.scss']
})
export class TrekkingItemComponent {
  difficultLevelBadgdeClass = difficultLevelClass;
  difficultLevelBadgdeLabel = difficultLevelLabel;
  difficultLeveEnums = DifficultLevelEnum;

  @Input() trekking!: Trekking;
  @Output() onClick: EventEmitter<void> = new EventEmitter();

  getSrcImages(images: TrekkingImage[]): string[] {
    return images?.map(image => image.image) || []
  }

  handleClick(): void {
    this.onClick.emit();
  }
}
