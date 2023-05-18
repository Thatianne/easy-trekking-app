import { NgModule } from "@angular/core";
import { LogoModule } from "@components/logo/logo.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AvailableTrekkingsComponent } from "./available-trekkings.component";
import { FiltersComponent } from './components/filters/filters.component';
import { TrekkingItemComponent } from "./components/trekking-item/trekking-item.component";
import { TrekkingCarouselModule } from "@components/trekking-carousel/trekking-carousel.module";
import { LoadingModule } from "@components/loading/loading.module";

@NgModule({
  declarations: [AvailableTrekkingsComponent, FiltersComponent, TrekkingItemComponent],
  imports: [CommonModule, LogoModule, ReactiveFormsModule, FormsModule, TrekkingCarouselModule, LoadingModule],
  exports: [AvailableTrekkingsComponent]
})
export class AvailableTrekkingsModule {}
