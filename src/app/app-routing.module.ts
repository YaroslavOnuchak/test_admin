import {NgModule} from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import {LogInComponent} from "./pages/log-in/log-in.component"
import {MainPageComponent} from "./pages/main-page/main-page.component";
import {UserInfoComponent} from "./pages/user-info/user-info.component";
import {CreateUserComponent} from "./pages/create-user/create-user.component";


const routes: Routes = [
  { path: '', redirectTo: 'log', pathMatch: 'full' },
  { path: 'log', component: LogInComponent },
  { path: 'main-page', component: MainPageComponent },
  { path: 'create-user', component: CreateUserComponent },
  { path: 'user-info', component:  UserInfoComponent},
  { path: '**', redirectTo: 'log' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
