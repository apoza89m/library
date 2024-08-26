import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addPunto',
  standalone: true,
})
export class AddPuntoPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return (value += '.');
  }
}
