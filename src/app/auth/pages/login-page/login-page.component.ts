import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { FormUtils } from 'src/app/utils/formUtils';

@Component({
  selector: 'app-login-page',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './login-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {

  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  showPassword = signal<boolean>(false);
  hasError = signal(false);
  isPosting = signal(false);

  fadeState = signal('');

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(FormUtils.emailPattern)], []],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  showErrorMessage() {
    if (this.hasError() === true) return;

    this.fadeState.set('animate-fadeIn');

    this.hasError.set(true);

    setTimeout(() => {
      this.fadeState.set('animate-fadeOut');
      setTimeout(() => {
        this.hasError.set(false);
      }, 1000);
    }, 2000)

  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.showErrorMessage();
    }

    const { email = '', password = '' } = this.loginForm.value;

    this.authService.login(email!, password!).subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.router.navigateByUrl('/', { replaceUrl: true }  /*So the user will not be able to return to the login page*/)
        return
      }

      this.showErrorMessage()
      return;

    });

  }



}
