import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from '@components/navbar/navbar.component';
import { LayoutComponent } from '@layouts/layout/layout.component';
import { LoginModule } from '@pages/login/login.module';
import { HttpClientModule } from '@angular/common/http';
import { TouristGuideRegisterModule } from '@pages/tourist-guide-register/tourist-guide-register.module';
import { AvailableTrekkingsModule } from '@pages/available-trekkings/available-trekkings.module';
import { TrekkingDetailsModule } from '@pages/trekking-details/trekkings-details.module';
import { TrekkingsModule } from '@pages/trekkings/trekkings.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LayoutComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    LoginModule,
    TouristGuideRegisterModule,
    TrekkingDetailsModule,
    TrekkingsModule,
    AvailableTrekkingsModule,
    TrekkingDetailsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
