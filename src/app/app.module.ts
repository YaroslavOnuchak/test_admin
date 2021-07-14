import {NgModule} from '@angular/core';

import {NgxsModule} from '@ngxs/store';
import {DataState} from './store/state/datas.state';

import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule} from '@angular/forms';
import {PopoverModule} from 'ngx-bootstrap/popover';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import {AppComponent} from './app.component';
import {MainPageComponent} from './pages/main-page/main-page.component';
import {UserInfoComponent} from './pages/user-info/user-info.component';
import {CreateUserComponent} from './pages/create-user/create-user.component';
import {MainComponent} from "./components/main/main.component";
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {LogInComponent} from './pages/log-in/log-in.component';
import {UsersComponent} from './components/users/users.component';
import {SearchFilterPipe} from './shared/pipe/search-filter.pipe';
import {UserComponent} from './components/users/user/user.component';
import {environment} from "../environments/environment";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import {environment} from "../environments/environment.prod";
import {NgSelectModule} from '@ng-select/ng-select';
import {AuthGuardService} from "./core/services/authentication/auth-guard.service";

import {GetUsersResolver} from "./resolver/get-users.resolver";
import {SocialLoginModule, GoogleLoginProvider, SocialAuthServiceConfig} from "angularx-social-login";


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
    SocialLoginModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthGuardService, GetUsersResolver,
    {
      provide: "SocialAuthServiceConfig",
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '764346114298-9v7goonkcift2q9aokua6fk7kcpf0is4.apps.googleusercontent.com'
            )
          }
        ]
      } as SocialAuthServiceConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
