import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { FormUtils } from 'src/app/utils/formUtils';
import { PasswordInputComponent } from "@auth/components/password-Input/password-Input.component";


@Component({
  selector: 'app-login-page',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    NgClass,
    PasswordInputComponent
],
  templateUrl: './login-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {

  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  hasError = signal(false);
  isPosting = signal(false);

  fadeState = signal('');
  errorMessage = signal('Por favor revise la información ingresada')

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(FormUtils.emailPattern)], []],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  get passwordControl(): FormControl {
    return this.loginForm.get('password')! as FormControl
  }

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

    if (this.isPosting()) return;

    const { email = '', password = '' } = this.loginForm.value;

    this.isPosting.set(true)

    this.authService.login(email!, password!).subscribe(isAuthenticated => {

      if (isAuthenticated) {
        this.router.navigateByUrl('/', { replaceUrl: true }  /*So the user will not be able to return to the login page*/)
        return
      }

      this.isPosting.set(false);
      this.showErrorMessage()
      return;

    });

  }



}
