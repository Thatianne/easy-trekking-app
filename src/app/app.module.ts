import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from '@components/navbar/navbar.component';
import { LayoutComponent } from '@layouts/layout/layout.component';
import { LoginModule } from '@pages/login/login.module';
import { HttpClientModule } from '@angular/common/http';
import { TouristGuideRegisterModule } from '@pages/tourist-guide-register/tourist-guide-register.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    LoginModule,
    TouristGuideRegisterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
