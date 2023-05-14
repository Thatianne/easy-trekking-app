import { NgModule } from "@angular/core";
import { LogoModule } from "@components/logo/logo.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AvailableTrekkingsComponent } from "./available-trekkings.component";
import { FiltersComponent } from './components/filters/filters.component';

@NgModule({
  declarations: [AvailableTrekkingsComponent, FiltersComponent],
  imports: [CommonModule, LogoModule, ReactiveFormsModule, FormsModule],
  exports: [AvailableTrekkingsComponent]
})
export class AvailableTrekkingsModule {}
