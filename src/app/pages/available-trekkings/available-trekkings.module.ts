import { NgModule } from "@angular/core";
import { LogoModule } from "@components/logo/logo.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AvailableTrekkingsComponent } from "./available-trekkings.component";
import { TrekkingItemComponent } from "./components/trekking-item/trekking-item.component";
import { TrekkingCarouselModule } from "@components/trekking-carousel/trekking-carousel.module";
import { LoadingModule } from "@components/loading/loading.module";
import { TrekkingFiltersModule } from "@components/trekking-filters/trekking-filters.module";

@NgModule({
  declarations: [AvailableTrekkingsComponent, TrekkingItemComponent],
  imports: [CommonModule, LogoModule, ReactiveFormsModule, FormsModule, TrekkingCarouselModule, LoadingModule, TrekkingFiltersModule],
  exports: [AvailableTrekkingsComponent]
})
export class AvailableTrekkingsModule {}
