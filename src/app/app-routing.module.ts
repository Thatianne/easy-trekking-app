import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './layouts/layout/layout.component';
import { canActivateUser } from './guards/auth.guard';
import { TouristGuideRegisterComponent } from '@pages/tourist-guide-register/tourist-guide-register.component';
import { AvailableTrekkingsComponent } from '@pages/available-trekkings/available-trekkings.component';
import { TrekkingDetailsComponent } from '@pages/trekking-details/trekking-details.component';
import { TrekkingsComponent } from '@pages/trekkings/trekkings.component';
import { TouristRegisterComponent } from '@pages/tourist-register/tourist-register.component';
import { AddTrekkingComponent } from '@pages/add-trekking/add-trekking.component';
import { EnableGuideTrekkingsComponent } from '@pages/enable-guide-trekkings/enable-guide-trekkings.component';
import { canActivateHome } from './guards/home.guard';
import { EmptyComponent } from '@pages/empty/empty.component';
import { ExecuteAutomatedTasksComponent } from '@pages/execute-automated-tasks/execute-automated-tasks.component';
import { GroupsComponent } from '@pages/groups/groups.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register/tourist-guide', component: TouristGuideRegisterComponent },
  { path: 'register/tourist', component: TouristRegisterComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [canActivateUser],
    children: [
      {
        path: '',
        component: EmptyComponent,
        canActivate: [canActivateHome]
      },
      {
        path: 'trekkings',
        children: [
          {
            path: '',
            component: AvailableTrekkingsComponent,
          },
          {
            path: ':id',
            component: TrekkingDetailsComponent,
          },
        ]
      },
      {
        path: 'admin',
        children: [
          {
            path: 'trekkings',
            component: TrekkingsComponent
          },
          {
            path: 'trekkings/:id',
            component: AddTrekkingComponent
          },
          {
            path: 'trekkings/create',
            component: AddTrekkingComponent
          },
          {
            path: 'automated-tasks',
            component: ExecuteAutomatedTasksComponent
          },
          {
            path: 'groups',
            component: GroupsComponent
          }
        ]
      },
      {
        path: 'tourist-guide',
        children: [
          {
            path: 'trekkings',
            component: EnableGuideTrekkingsComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
