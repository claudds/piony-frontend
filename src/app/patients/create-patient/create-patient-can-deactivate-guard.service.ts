import { CanDeactivate } from '@angular/router';
import { CreatePatientComponent } from './create-patient.component';
import { Injectable } from '@angular/core';

@Injectable()
export class CreatePatientCanDeactivateGuardService implements CanDeactivate<CreatePatientComponent> {
    canDeactivate(component: CreatePatientComponent): boolean {
        if (component.createPatientForm.dirty) {
            return confirm("Are you sure you want to navigate away from this page? All information entered will be lost");
        }
        return true;
    };
}