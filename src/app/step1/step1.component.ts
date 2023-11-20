import {
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  Input,
  ViewContainerRef,
} from '@angular/core';
import { Steps } from '../steps';
import { AddressComponent } from '../address/address.component';
import { AgeComponent } from '../age/age.component';
import { NameComponent } from '../name/name.component';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.css'],
})
export class Step1Component {
  @Input() stepsInput: Steps[] = [];
  @Input() currentIndex: number = 0;

  // Define the components you want to load
  componentTypes = [NameComponent, AgeComponent, AddressComponent];

  constructor(
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit() {
    // Initial load of the component
    this.loadComponent();
  }

  private loadComponent() {
    // Clear existing content
    this.viewContainerRef.clear();

    // Determine the component to load based on currentIndex
    const componentType = this.componentTypes[this.currentIndex];

    // Instantiate the component and attach it to the view
    const componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(componentType);
    const componentRef =
      this.viewContainerRef.createComponent(componentFactory);

    // You can pass inputs or perform additional setup if needed
    // if ('someInput' in componentRef.instance) {
    //   componentRef.instance.someInput = someValue;
    // }
  }
}
