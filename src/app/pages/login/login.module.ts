import { NgModule } from "@angular/core";
import { LoginComponent } from "./login.component";
import { LogoComponent } from "@components/logo/logo.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [LoginComponent, LogoComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [LoginComponent]
})
export class LoginModule {

}
