import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appStep]',
})
export class StepDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
