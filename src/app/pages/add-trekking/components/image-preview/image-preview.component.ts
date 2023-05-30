import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AddTrekkingImageRequest } from '@models/trekking';

@Component({
  selector: 'app-image-preview',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.scss']
})
export class ImagePreviewComponent {

  @Input() image!: AddTrekkingImageRequest;

  @Input() imgHeight?: string = '100px';

  @Output() remove = new EventEmitter();

  onRemove(event: Event): void {
    event.preventDefault();
    this.remove.emit();
  }
}
