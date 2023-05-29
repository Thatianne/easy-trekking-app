import { NgModule } from "@angular/core";
import { LogoModule } from "@components/logo/logo.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule, DatePipe } from "@angular/common";
import { TrekkingDetailsComponent } from "./trekking-details.component";
import { TrekkingDescriptionComponent } from "./components/trekking-description/trekking-description.component";
import { BrowserModule } from "@angular/platform-browser";
import { TrekkingCarouselModule } from "@components/trekking-carousel/trekking-carousel.module";
import { LoadingModule } from "@components/loading/loading.module";

@NgModule({
  declarations: [TrekkingDetailsComponent, TrekkingDescriptionComponent],
  imports: [CommonModule, BrowserModule, LogoModule, ReactiveFormsModule, FormsModule, TrekkingCarouselModule, LoadingModule, DatePipe],
  providers: [DatePipe],
  exports: [TrekkingDetailsComponent]
})
export class TrekkingDetailsModule {}
