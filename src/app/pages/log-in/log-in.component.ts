import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {take} from 'rxjs/operators';
import {AuthService} from '../../core/services/Auth/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { // full names
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = this.loading = true;
    //
    // // stop here if form is invalid
    // if (this.loginForm.invalid) {
    //   return;
    // }
    // this.loginForm.get('username').value
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(take(1))
      .subscribe(data => {
          console.log(data)
          if (data) {
            this.router.navigate(['/main-page']);
          } else {
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
