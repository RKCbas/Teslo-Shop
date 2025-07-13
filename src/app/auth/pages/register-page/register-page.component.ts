import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { FormUtils } from 'src/app/utils/formUtils';
import { PasswordInputComponent } from "@auth/components/password-Input/password-Input.component";
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-register-page',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    PasswordInputComponent,
    NgClass
],
  templateUrl: './register-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPageComponent {

  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  hasError = signal(false);
  isPosting = signal(false);

  fadeState = signal('');
  errorMessage = signal('Por favor revise la información ingresada')

  registerForm = this.fb.group({
    fullName: ['', [Validators.required, Validators.pattern(FormUtils.namePattern)]],
    email: ['', [Validators.required, Validators.pattern(FormUtils.emailPattern)], []],
    password1: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]]
  },{
    validators:[
      FormUtils.isFieldOneEqualFieldTwo('password1', 'password2')
    ]
  });

  get passwordControl1(): FormControl {
    return this.registerForm.get('password1')! as FormControl
  }

  get passwordControl2(): FormControl {
    return this.registerForm.get('password2')! as FormControl
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
    if (this.registerForm.invalid) {
      this.showErrorMessage();
    }

    if (this.isPosting()) return;

    const { fullName = '', email = '', password1 = '' } = this.registerForm.value;

    this.authService.register(fullName!, email!, password1!).subscribe(isAuthenticated => {
      this.isPosting.set(true)

      if (isAuthenticated) {
        this.router.navigateByUrl('/', { replaceUrl: true }  /*So the user will not be able to return to the login page*/)
        return
      }

      this.isPosting.set(false);
      this.showErrorMessage()
      return;
    })


  }
}
