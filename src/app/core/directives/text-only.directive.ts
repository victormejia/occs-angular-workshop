import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appTextOnly]'
})
export class TextOnlyDirective {

  constructor() {
  }

  @HostListener('keydown', ['$event'])
  onKeydown(event) {
    const numberRegex = /[0-9]/;

    if (numberRegex.test(event.key)) {
      event.preventDefault();
    }
  }
}
