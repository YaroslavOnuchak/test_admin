import {NgModule} from "@angular/core";
import {Routes, RouterModule, CanActivate} from '@angular/router';
import {LogInComponent} from "./pages/log-in/log-in.component"
import {MainPageComponent} from "./pages/main-page/main-page.component";
import {UserInfoComponent} from "./pages/user-info/user-info.component";
import {CreateUserComponent} from "./pages/create-user/create-user.component";

import {AuthGuardService} from './core/services/authentication/auth-guard.service';
const routes: Routes = [
  {path: '', redirectTo: 'log', pathMatch: 'full'},
  {path: 'log', component: LogInComponent},
  {path: 'main-page', component: MainPageComponent,
    canActivate: [AuthGuardService]},
  {path: 'create-user', component: CreateUserComponent,
    canActivate: [AuthGuardService]},
  {path: 'user-info', component: UserInfoComponent,
    canActivate: [AuthGuardService]},
  {path: '**', redirectTo: 'log'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
