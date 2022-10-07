import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllPlaceEditorComponent } from './page/all-place-editor/all-place-editor.component';
import { AllPlaceViewerComponent } from './page/all-place-viewer/all-place-viewer.component';
import { ForbiddenComponent } from './page/forbidden/forbidden.component';
import { HomeComponent } from './page/home/home.component';
import { LoginComponent } from './page/login/login.component';
import { PlacesComponent } from './page/places/places.component';
import { UsersEditorComponent } from './page/users-editor/users-editor.component';
import { UsersComponent } from './page/users/users.component';
import { AuthGuardService } from './service/auth-guard.service';
import { RoleGuardService } from './service/role-guard.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'forbidden',
    component: ForbiddenComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuardService, RoleGuardService],
    data: {
      expectedRole: 3,
    },
  },
  {
    path: 'users/edit/:id',
    component: UsersEditorComponent,
    canActivate: [AuthGuardService, RoleGuardService],
    data: {
      expectedRole: 3,
    },
  },
  {
    path: 'users/edit/`0`',
    component: UsersEditorComponent,
    canActivate: [AuthGuardService, RoleGuardService],
    data: {
      expectedRole: 3,
    },
  },
  {
    path: 'all-place',
    component: AllPlaceViewerComponent,
    canActivate: [AuthGuardService, RoleGuardService],
    data: {
      expectedRole: 3,
    },
  },
  {
    path: 'all-place/edit/`0`',
    component: AllPlaceEditorComponent,
    canActivate: [AuthGuardService, RoleGuardService],
    data: {
      expectedRole: 3,
    },
  },
  {
    path: 'all-place/edit/:id',
    component: AllPlaceEditorComponent,
    canActivate: [AuthGuardService, RoleGuardService],
    data: {
      expectedRole: 3,
    },
  },
  {
    path: 'place/:location',
    component: PlacesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
