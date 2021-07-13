import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {pluck, take} from 'rxjs/operators';
import {AuthGuardService} from "../../core/services/authentication/auth-guard.service";
import {User} from "../../core/interfaces";
import {Store} from "@ngxs/store";
import {Login, LoginGoogle} from "../../store/actions/authentication.actions";
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
    // const storage = localStorage.getItem("logged_user");

    this.authGuardService.checkLoggedUser()

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get formFields() {
    return this.loginForm.controls;
  }

  onSubmit(event: any): void {
    let newDispatch;

    if (event?.target?.classList?.contains("google-sign-in")) {
      newDispatch = new LoginGoogle()
    } else if (event?.target?.classList?.contains("simply-log-in")) {
      newDispatch = new Login(this.formFields.username.value,
        this.formFields.password.value)
    }
    this.submitted = this.loading = true;
    this.store.dispatch(newDispatch)
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

  singOutGoogle(): void {
    localStorage.removeItem("logged_user");
    this.router.navigateByUrl('/log').then()
  }
}
