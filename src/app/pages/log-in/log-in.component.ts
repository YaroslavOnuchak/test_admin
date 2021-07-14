import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {pluck, take} from 'rxjs/operators';
import {AuthGuardService} from "../../core/services/authentication/auth-guard.service";
import {User} from "../../core/interfaces";
import {Store} from "@ngxs/store";
import {CheckLoggedUser, Login, LoginGoogle} from "../../store/actions/authentication.actions";
import {SocialUser, GoogleLoginProvider, SocialAuthService} from "angularx-social-login";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  loginForm: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;
  error: string = '';


  user: SocialUser;
  userDetails: SocialUser;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authGuardService: AuthGuardService,
    private store: Store,
    private ref: ChangeDetectorRef,
    private authSocialSer: SocialAuthService
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(new CheckLoggedUser());
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get formFields() {
    return this.loginForm.controls;
  }

  onSubmit(event: any): void {
    if (event?.target?.classList?.contains("google-sign-in")) {
      this.store.dispatch(new LoginGoogle())
        .pipe(take(1), pluck('Data', 'loggedUser'))
        .subscribe((loggedUser: User) => {
            if (loggedUser) {
              this.router.navigate(['/main-page']);
            } else {
              this.loading = false;
              this.error = `no user or wrong user/pass`
              return;
            }
          },
          error => {
            this.error = error;
            this.loading = false;
          }
        )
    }
    else if (event?.target?.classList?.contains("simply-log-in")) {
      this.submitted = this.loading = true;
      this.store.dispatch(new Login(
        this.formFields.username.value,
        this.formFields.password.value)
      )
        .pipe(take(1), pluck('Data', 'loggedUser'))
        .subscribe((loggedUser: User) => {
            if (loggedUser) {
              this.router.navigate(['/main-page']);
            } else {
              this.loading = false;
              this.error = `no user or wrong user/pass`
              return;
            }
          },
          error => {
            this.error = error;
            this.loading = false;
          }
        )
    }
  }
}
