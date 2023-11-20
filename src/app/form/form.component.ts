// import { Component, ViewChild } from '@angular/core';
// import { StepDirective } from '../step.directive';
// import { SidebarComponent } from '../sidebar/sidebar.component';
// import { Step1Component } from '../step1/step1.component';
// import { Step2Component } from '../step2/step2.component';
// import { Step3Component } from '../step3/step3.component';
// import { Steps } from '../steps';
// import { NameComponent } from '../name/name.component';
// import { AgeComponent } from '../age/age.component';

// @Component({
//   selector: 'app-form',
//   templateUrl: './form.component.html',
//   styleUrls: ['./form.component.css'],
// })
// export class FormComponent {
//   currentStep: number = 1;
//   constructor() {}

//   @ViewChild(StepDirective)
//   appStep!: StepDirective;

//   // public currentStep = 1;
//   private componentRef: any;
//   public currentSteps: Steps[] = [];

//   public componentTypes = [Step1Component, Step2Component, Step3Component];
//   public step1 = [NameComponent, AgeComponent];

//   ngAfterViewInit() {
//     this.loadComponent();
//   }

//   showStep(stepNumber: number) {
//     this.currentStep = stepNumber;
//     this.loadComponent();
//   }

//   selectStep(stepName: string) {
//     const selectedStep = this.currentSteps.find(
//       (step) => step.name === stepName
//     );
//     if (selectedStep) {
//       this.currentStep = this.currentSteps.indexOf(selectedStep) + 1;
//       this.loadComponent();
//     }
//   }

//   emitSteps(steps: Steps[]) {
//     this.currentSteps = steps;
//     this.loadComponent();
//   }

//   nextStep() {
//     if (this.currentStep < 3) {
//       this.currentStep++;
//       this.loadComponent();
//     }
//   }
//   updateSteps(steps: Steps[]) {
//     this.currentSteps = steps;
//     this.loadComponent();
//   }
//   prevStep() {
//     if (this.currentStep > 1) {
//       this.currentStep--;
//       this.loadComponent();
//     }
//   }

//   private loadComponent() {
//     if (this.componentRef) {
//       this.componentRef.destroy();
//     }

//     const currentComponent = this.componentTypes[this.currentStep - 1];
//     let viewContainerRef = this.appStep.viewContainerRef;
//     viewContainerRef.clear();

//     // Instantiate the component directly
//     this.componentRef = viewContainerRef.createComponent(currentComponent);
//     if ('stepsInput' in this.componentRef.instance) {
//       this.componentRef.instance.stepsInput = this.currentSteps;
//     }
//   }
// }

// FormComponent.ts
import { Component } from '@angular/core';
import { Steps } from '../steps';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  selectedStep: Steps = { name: '', inProgress: false, isCompleted: false };
  currentStep = 1;

  emitSteps(event: { steps: Steps[]; selectedStep: Steps }) {
    this.selectedStep = event.selectedStep;
    this.currentStep = event.steps.indexOf(this.selectedStep) + 1;
  }

  showStep(stepNumber: number) {
    this.currentStep = stepNumber;
  }

  nextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }
}
