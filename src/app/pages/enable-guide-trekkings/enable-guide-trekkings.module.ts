import { NgModule } from "@angular/core";
import { LogoModule } from "@components/logo/logo.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { EnableGuideTrekkingsComponent } from "./enable-guide-trekkings.component";
import { TrekkingsTableComponent } from './components/trekkings-table/trekkings-table.component';
import { LoadingModule } from "@components/loading/loading.module";
import { TrekkingFiltersModule } from "@components/trekking-filters/trekking-filters.module";

@NgModule({
  declarations: [EnableGuideTrekkingsComponent, TrekkingsTableComponent],
  imports: [CommonModule, LogoModule, ReactiveFormsModule, FormsModule, LoadingModule, TrekkingFiltersModule],
  exports: [EnableGuideTrekkingsComponent]
})
export class EnableGuideTrekkingsModule {}
