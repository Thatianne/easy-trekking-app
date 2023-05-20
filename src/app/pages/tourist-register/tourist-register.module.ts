import { NgModule } from "@angular/core";
import { LogoModule } from "@components/logo/logo.module";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { TouristRegisterComponent } from "./tourist-register.component";

@NgModule({
  declarations: [TouristRegisterComponent],
  imports: [CommonModule, LogoModule, ReactiveFormsModule],
  exports: [TouristRegisterComponent]
})
export class TouristRegisterModule {}
