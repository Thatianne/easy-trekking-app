import { NgModule } from "@angular/core";
import { LogoModule } from "@components/logo/logo.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { TrekkingCarouselComponent } from "./trekking-carousel.component";

@NgModule({
  declarations: [TrekkingCarouselComponent],
  imports: [CommonModule, LogoModule, ReactiveFormsModule, FormsModule],
  exports: [TrekkingCarouselComponent]
})
export class TrekkingCarouselModule {}
