import { NgModule } from "@angular/core";
import { LogoModule } from "@components/logo/logo.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { TrekkingsComponent } from "./trekkings.component";
import { FiltersComponent } from './components/filters/filters.component';
import { TrekkingsTableComponent } from './components/trekkings-table/trekkings-table.component';

@NgModule({
  declarations: [TrekkingsComponent, FiltersComponent, TrekkingsTableComponent],
  imports: [CommonModule, LogoModule, ReactiveFormsModule, FormsModule],
  exports: [TrekkingsComponent]
})
export class TrekkingsModule {}
