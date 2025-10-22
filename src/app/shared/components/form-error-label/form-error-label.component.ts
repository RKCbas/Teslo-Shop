
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { FormUtils } from 'src/app/utils/formUtils';

@Component({
  selector: 'form-error-label',
  imports: [
  ],
  templateUrl: './form-error-label.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormErrorLabelComponent {

  errors = input.required<ValidationErrors | null>()

  get errorMessage() {
    if (this.errors()) {
      return FormUtils.getTextError(this.errors()!)
    }
    return null
  }
}
