import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Condition } from '../../models/condition.model';
import { Patient } from '../../models/patient.model';
import { PatientService } from '../../services/patient.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-patient',
  templateUrl: './create-patient.component.html',
  styleUrls: ['./create-patient.component.css']
})
export class CreatePatientComponent implements OnInit {
  @ViewChild('patientForm') public createPatientForm: NgForm;
  
  private conditions: Condition[];
  private isLoading: boolean = true;

  patient: Patient = {
    id: null,
    mobilePhone: null,
    firstName: null,
    lastName: null,
    streerAdress: null,
    city: null,
    state: null,
    postalCode: null,
    conditions: null,
    status: null,
    risk: null,
  }

  constructor(private _patientService: PatientService, private _router: Router) { }

  ngOnInit() {
    this._patientService.getConditions().subscribe((conds) => {
      this.conditions = conds;
      this.isLoading = false;
    },
    (err: any) => {
      console.error("There was an error retrieving conditions: " + err);
    });
  }

  savePatient(): void {
    this._patientService.addPatient(this.patient).subscribe((pat: Patient) => {
      this.createPatientForm.reset();
      this._router.navigate(["/patients"]);
    }, 
    (err: any) => {
      console.error("There was an error saving: " + err);
    });
  }

}
