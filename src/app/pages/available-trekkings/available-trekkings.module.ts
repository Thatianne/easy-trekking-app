import { NgModule } from "@angular/core";
import { LogoModule } from "@components/logo/logo.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AvailableTrekkingsComponent } from "./available-trekkings.component";
import { FiltersComponent } from './components/filters/filters.component';
import { TrekkingsTableComponent } from './components/trekkings-table/trekkings-table.component';

@NgModule({
  declarations: [AvailableTrekkingsComponent, FiltersComponent, TrekkingsTableComponent],
  imports: [CommonModule, LogoModule, ReactiveFormsModule, FormsModule],
  exports: [AvailableTrekkingsComponent]
})
export class AvailableTrekkingsModule {}
