import { AbstractControl, FormArray, FormGroup, ValidationErrors } from "@angular/forms";

async function sleep(){
  return new Promise((resolve) => {
    setTimeout(()=>{
      resolve(true);
    }, 2500);
  });
}

export class FormUtils {
  // Expresiones regulares
  static readonly namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static readonly emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static readonly notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

  static getTextError(errors: ValidationErrors): string | null {
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido'
        case 'minlength':
          return `Mínimo de ${errors['minlength'].requiredLength} caracteres`
        case 'min':
          return `valor mínimo de  ${errors['min'].min}`
        case 'max':
          return `valor máximo de  ${errors['max'].max}`
        case 'email':
          return 'El email no es válido'
        case 'pattern':
          if (errors['pattern'].requiredPattern === FormUtils.namePattern) {
            return "El nombre debe contener al menos un nombre y un apellido"
          }

          else if (errors['pattern'].requiredPattern === FormUtils.emailPattern) {
            return "El email ingresado no es válido"
          }

          else if (errors['pattern'].requiredPattern === FormUtils.notOnlySpacesPattern) {
            return "El campo no puede contener solo espacios"
          }

          return "El formato ingresado no es válido"
        case 'notEqual':
          return 'Los campos no son iguales'
        case 'emailTaken':
          return 'El email ya está en uso'
        // case 'notStrider':
        //   return 'El usuario strider ya esta registrado'

        default:
          return `error: ${key}`
      }
    }
    return null
  }

  static isValidField(form: FormGroup, fieldName: string): boolean | null {
    return !!(form.controls[fieldName].errors && form.controls[fieldName].touched);
  }


  static getFieldError(form: FormGroup, fieldName: string): string | null {
    if (!form.controls[fieldName]) return null;

    const errors = form.controls[fieldName].errors ?? {};

    return this.getTextError(errors);

  }

  static isValidFieldInArray(formArray: FormArray, index: number): boolean | null {
    return (
      formArray.controls[index].errors && formArray.controls[index].touched
    )
  }

  static getFieldInArrayError(formArray: FormArray, index: number): string | null {
    if (!formArray.controls[index]) return null;

    const errors = formArray.controls[index].errors ?? {};

    return this.getTextError(errors);

  }

  static isFieldOneEqualFieldTwo( field1:string, field2:string) {
    return (formGroup: AbstractControl) => {
      const field1Value = formGroup.get(field1)?.value;
      const field2Value = formGroup.get(field2)?.value;
      return field1Value === field2Value ? null : { notEqual: true };
    }
  }

  // static notStrider(control: AbstractControl): ValidationErrors | null {
  //   const formValue = control.value;
  //   return formValue.toLowerCase() === 'strider' ? { notStrider: true } : null;
  // }

  static async checkingServerResponse(control: AbstractControl): Promise<ValidationErrors | null>{
    console.log('Validando email en el servidor...');
    await sleep();
    const formValue = control.value;
    if ( formValue === 'hola@mundo.com'){
      return { emailTaken: true };
    }
    return null
  }

}
