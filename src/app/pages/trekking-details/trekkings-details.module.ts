import { NgModule } from "@angular/core";
import { LogoModule } from "@components/logo/logo.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { TrekkingDetailsComponent } from "./trekking-details.component";
import { TrekkingDescriptionComponent } from "./components/trekking-description/trekking-description.component";
import { BrowserModule } from "@angular/platform-browser";
import { TrekkingCarouselComponent } from './components/trekking-carousel/trekking-carousel.component';

@NgModule({
  declarations: [TrekkingDetailsComponent, TrekkingDescriptionComponent, TrekkingCarouselComponent],
  imports: [CommonModule, BrowserModule, LogoModule, ReactiveFormsModule, FormsModule],
  exports: [TrekkingDetailsComponent]
})
export class TrekkingDetailsModule {}
