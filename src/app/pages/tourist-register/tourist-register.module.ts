import { NgModule } from "@angular/core";
import { LogoModule } from "@components/logo/logo.module";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { TouristRegisterComponent } from "./tourist-register.component";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [TouristRegisterComponent],
  imports: [CommonModule, LogoModule, ReactiveFormsModule, RouterModule],
  exports: [TouristRegisterComponent]
})
export class TouristRegisterModule {}
