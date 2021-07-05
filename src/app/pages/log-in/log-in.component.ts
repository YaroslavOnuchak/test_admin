import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {take} from 'rxjs/operators';
import {AuthGuardService} from "../../core/services/authentication/auth-guard.service";

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

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authGuardService: AuthGuardService,
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get formFields() { // full names
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = this.loading = true;
    this.authGuardService.login(this.formFields.username.value, this.formFields.password.value)
      .pipe(take(1))
      .subscribe(data => {
          if (data) {
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
      );
  }
}
