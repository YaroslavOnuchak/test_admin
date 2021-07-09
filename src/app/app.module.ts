import { NgModule } from '@angular/core';

import { NgxsModule } from '@ngxs/store';
import {DataState} from './store/state/datas.state';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { UserInfoComponent } from './pages/user-info/user-info.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { MainComponent } from "./components/main/main.component";
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { UsersComponent } from './components/users/users.component';
import { SearchFilterPipe } from './shared/pipe/search-filter.pipe';
import { UserComponent } from './components/users/user/user.component';
import {environment} from "../environments/environment";
import {NgxsRootModule} from "@ngxs/store/src/modules/ngxs-root.module";
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
// import {environment} from "../environments/environment.prod";
import { NgSelectModule } from '@ng-select/ng-select';
import {AuthGuardService} from "./core/services/authentication/auth-guard.service";

import {UserResolver} from "./resolver/user.resolver";
import {GetUsersResolver} from "./resolver/get-users.resolver";

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    UserInfoComponent,
    CreateUserComponent,
    SidebarComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
    LogInComponent,
    UsersComponent,
    SearchFilterPipe,
    UserComponent,
  ],
  imports: [
    NgxsModule.forRoot([DataState], {
      developmentMode: !environment.production
    }),
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    PopoverModule.forRoot(),
    NgSelectModule,
    // NgxsReduxDevtoolsPluginModule.forRoot(),
    // NgxsLoggerPluginModule.forRoot()

    // MatFormFieldModule,
    // NoopAnimationsModule,
  ],
  providers: [
    AuthGuardService, UserResolver, GetUsersResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
