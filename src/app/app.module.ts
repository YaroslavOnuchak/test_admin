import { NgModule } from '@angular/core';

import { NgxsModule } from '@ngxs/store';
import { UsersState } from './store/state/users.state';

import { BrowserModule } from '@angular/platform-browser';
// import {MatFormFieldModule} from '@angular/material/form-field';
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
    UserComponent
  ],
  imports: [
    NgxsModule.forRoot([UsersState], {
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
    AuthGuardService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
