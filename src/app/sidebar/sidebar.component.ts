// SidebarComponent.ts
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MainObject, Steps } from '../steps';
import { StepDirective } from '../step.directive';
import { NameComponent } from '../name/name.component';
import { AgeComponent } from '../age/age.component';
import { AddressComponent } from '../address/address.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  @ViewChild(StepDirective)
  appStep!: StepDirective;

  public currentStep = 1;
  private componentRef: any;
  public currentSteps: Steps[] = [];

  public componentTypes = [NameComponent, AgeComponent, AddressComponent];
  @Output() stepsEmitter = new EventEmitter<{
    steps: Steps[];
    selectedStep: Steps;
  }>();
  @Output() nextClicked = new EventEmitter<void>();

  allSteps: MainObject = [
    { step1: { name: 'Name', inProgress: false, isCompleted: false } },
    { step2: { name: 'Age', inProgress: false, isCompleted: false } },
    { step3: { name: 'Address', inProgress: false, isCompleted: false } },
  ];

  // selectStep(stepName: string) {
  //   const selectedStep = this.currentSteps.find(
  //     (step) => step.name === stepName
  //   );
  //   if (selectedStep) {
  //     this.currentStep = this.currentSteps.indexOf(selectedStep) + 1;
  //     this.loadComponent();
  //     this.stepsEmitter.emit({
  //       steps: this.currentSteps,
  //       selectedStep: selectedStep,
  //     });
  //   }
  // }

  ngAfterViewInit() {
    this.loadComponent();
  }

  showStep(stepNumber: number) {
    this.currentStep = stepNumber;
    this.loadComponent();
  }

  emitSteps(steps: Steps[]) {
    this.currentSteps = steps;
    this.loadComponent();
  }

  nextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
      this.loadComponent();
    }
  }

  handleNextClick() {
    // Call both nextStep and emit the nextClicked event
    this.nextStep();
    this.nextClicked.emit();
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.loadComponent();
    }
  }

  private loadComponent() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }

    const currentComponent = this.componentTypes[this.currentStep - 1];
    let viewContainerRef = this.appStep.viewContainerRef;
    viewContainerRef.clear();

    // Instantiate the component directly
    this.componentRef = viewContainerRef.createComponent(currentComponent);
    if ('stepsInput' in this.componentRef.instance) {
      this.componentRef.instance.stepsInput = this.currentSteps;
    }
  }
}
