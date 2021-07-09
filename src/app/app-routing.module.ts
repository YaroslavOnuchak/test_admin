import {NgModule} from "@angular/core";
import {Routes, RouterModule, CanActivate} from '@angular/router';
import {LogInComponent} from "./pages/log-in/log-in.component"
import {MainPageComponent} from "./pages/main-page/main-page.component";
import {UserInfoComponent} from "./pages/user-info/user-info.component";
import {CreateUserComponent} from "./pages/create-user/create-user.component";

import {AuthGuardService} from './core/services/authentication/auth-guard.service';

import {UserResolver} from "./resolver/user.resolver";
import {GetUsersResolver} from "./resolver/get-users.resolver";

const routes: Routes = [
  {
    path: 'log',
    component: LogInComponent
  },
  {
    path: '',
    redirectTo: 'log',
    pathMatch: 'full'
    // component: MainPageComponent,
    // canActivate: [AuthGuardService]
  },
  {
    path: 'main-page',
    component: MainPageComponent,
    canActivate: [AuthGuardService],
    resolve: {loggedUser: UserResolver}
  },
  {
    path: 'create-user',
    component: CreateUserComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'user-info',
    component: UserInfoComponent,
    canActivate: [AuthGuardService],
    resolve: {users: GetUsersResolver}
  },
  {
    path: '**',
    redirectTo: 'log'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
