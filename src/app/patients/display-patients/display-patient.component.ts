import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Patient } from '../../models/patient.model';
import { Router } from '@angular/router';
import { EditDialogueComponent } from '../edit-dialog/edit-dialogue.component';
import { MatDialog } from '@angular/material';
import { PatientService } from '../../services/patient.service';
import { RiskService } from '../../services/risk.service';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-display-patient',
  templateUrl: './display-patient.component.html',
  styleUrls: ['./display-patient.component.css']
})
export class DisplayPatientComponent implements OnInit {
  @Input() patient: Patient;
  @Output() deleted: EventEmitter<void> = new EventEmitter<void>();

  constructor(private _router: Router,
    private editDialog: MatDialog,
    private _patientService: PatientService,
    private _riskService: RiskService) { }

  ngOnInit() {
    this._riskService.getRisk(this.patient.postalCode).subscribe((risk) => {
      this.patient.risk = risk.properties.code;
    });
  }

  viewPatient(id: number): void {
    this._router.navigate(['/patients', id]);
  }

  editPatient(patient: Patient): void {
    const dialogRef = this.editDialog.open(EditDialogueComponent, {
      data: { patient }
    });

    //Have to retrieve the patient again here because the postal code may have changed
    dialogRef.afterClosed().subscribe((res) => {
      this._patientService.editPatient(res).subscribe((patEdited) => {
        this.patient = patEdited;
        console.log("Edit Success");
        this._riskService.getRisk(this.patient.postalCode).subscribe((risk) => {
          this.patient.risk = risk.properties.code;
        });
      });
    });
  }

  deletePatient(id: number): void {
    const mustDelete = confirm("Are you sure you want to delete this patient from the system?");
    if (mustDelete) {
      this._patientService.deletePatient(id).subscribe(() => {
        this.deleted.emit();
      });
    }
  }

}
