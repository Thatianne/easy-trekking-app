import { NgModule } from "@angular/core";
import { TouristGuideRegisterComponent } from "./tourist-guide-register.component";
import { LogoModule } from "@components/logo/logo.module";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [TouristGuideRegisterComponent],
  imports: [CommonModule, LogoModule, ReactiveFormsModule, RouterModule],
  exports: [TouristGuideRegisterComponent]
})
export class TouristGuideRegisterModule {}
