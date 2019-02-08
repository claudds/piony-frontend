import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../models/patient.model';
import { RiskService } from '../../services/risk.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-patients-details',
  templateUrl: './patients-details.component.html',
  styleUrls: ['./patients-details.component.css']
})

export class PatientsDetailsComponent implements OnInit {
  patient: Patient;
  patientId: number;
  isLoading: boolean;

  constructor(private _route: ActivatedRoute, 
    private _patientService: PatientService,
    private _riskService: RiskService) { 
      this.isLoading = true;
    }

  ngOnInit() {
    //Converts string to number
   this.patientId = parseInt(this._route.snapshot.paramMap.get('patientid'));
   this._patientService.getPatient(this.patientId).subscribe((pat: Patient) => {
     this.patient = pat;
     this._riskService.getRisk(this.patient.postalCode).subscribe((risk) => {
        this.patient.risk = risk.properties.code;
     });
     this.isLoading = false;
   });
  }
}
