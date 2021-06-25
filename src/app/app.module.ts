import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import {MatFormFieldModule} from '@angular/material/form-field';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
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
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,

    // MatFormFieldModule,
    // NoopAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
