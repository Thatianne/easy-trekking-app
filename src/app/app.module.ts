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
import { LoadingModule } from '@components/loading/loading.module';
import { TouristRegisterModule } from '@pages/tourist-register/tourist-register.module';
import { AddTrekkingModule } from '@pages/add-trekking/add-trekking.module';
import { EnableGuideTrekkingsModule } from '@pages/enable-guide-trekkings/enable-guide-trekkings.module';
import { EmptyComponent } from './pages/empty/empty.component';
import { ExecuteAutomatedTasksModule } from '@pages/execute-automated-tasks/execute-automated-tasks.module';
import { GroupsModule } from '@pages/groups/groups.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LayoutComponent,
    EmptyComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    LoginModule,
    TouristGuideRegisterModule,
    TouristRegisterModule,
    TrekkingDetailsModule,
    TrekkingsModule,
    AvailableTrekkingsModule,
    TrekkingDetailsModule,
    AddTrekkingModule,
    EnableGuideTrekkingsModule,
    LoadingModule,
    ExecuteAutomatedTasksModule,
    GroupsModule
  ],
  providers: [
    { provide: Window, useValue: window }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
