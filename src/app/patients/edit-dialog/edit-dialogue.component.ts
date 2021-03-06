import { Component, OnInit, Injectable, Inject, ViewChild } from '@angular/core';
import { Patient } from '../../models/patient.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NgForm } from '@angular/forms';
import { PatientService } from '../../services/patient.service';
import { Router } from '@angular/router';
import { Condition } from '../../models/condition.model';

export interface DialogData {
  patient: Patient
}

@Component({
  selector: 'app-edit-dialogue',
  templateUrl: './edit-dialogue.component.html',
  styleUrls: ['./edit-dialogue.component.css']
})
export class EditDialogueComponent implements OnInit {
  @ViewChild('patientForm') public editPatientForm: NgForm;

  private conditions: Condition[];

  patient: Patient;
  condition: Condition;

  constructor(private _patientService: PatientService,
    private _router: Router,
    private dialogRef: MatDialogRef<EditDialogueComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    this.patient = this.data.patient;
    this._patientService.getConditions().subscribe((conds) => {
      this.conditions = conds;
    },
      (err: any) => {
        console.error("There was an error retrieving conditions: " + err);
      });
  }

  compareById(c1: Condition, c2: Condition): boolean {
    return c1 && c2 && c1.id === c2.id;
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
