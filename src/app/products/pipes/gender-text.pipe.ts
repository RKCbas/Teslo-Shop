import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genderText'
})

export class GenderTextPipe implements PipeTransform {
  transform(value: string, ...args: any[]): string {
    switch (value) {
      case 'men':
        return 'hombres'
      case 'women':
        return 'mujeres'
      case 'kid':
        return 'niños'

      default:
        return 'Genero no valido'
    }

  }
}
