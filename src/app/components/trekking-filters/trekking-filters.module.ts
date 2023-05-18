import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TrekkingFiltersComponent } from "./trekking-filters.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [TrekkingFiltersComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [TrekkingFiltersComponent]
})
export class TrekkingFiltersModule {}
