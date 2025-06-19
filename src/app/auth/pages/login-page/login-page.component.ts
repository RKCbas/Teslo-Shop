import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { RouterLink } from '@angular/router';
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

  showPassword = signal<boolean>(false);
  hasError = signal(false);
  isPosting = signal(false);

  fadeState = 'animate-fadeIn';

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(FormUtils.emailPattern)], []],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  onSubmit() {
    if (this.loginForm.invalid) {
      this.hasError.set(true);
      setTimeout(() => {
        this.fadeState = 'animate-fadeOut';
        this.hasError.set(false)
      }, 2000)
      this.fadeState = 'animate-fadeIn';
    }

    const { email = '', password = '' } = this.loginForm.value;

    console.log({ email, password })

  }

}
