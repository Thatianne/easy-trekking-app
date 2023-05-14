import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './layouts/layout/layout.component';
import { canActivateUser } from './guards/auth.guard';
import { TouristGuideRegisterComponent } from '@pages/tourist-guide-register/tourist-guide-register.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register/tourist-guide', component: TouristGuideRegisterComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [canActivateUser],
    children: [
      // {
      //   path: 'home',
      //   component:
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
