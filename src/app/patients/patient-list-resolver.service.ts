import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Patient } from '../models/patient.model';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { PatientService } from '../services/patient.service';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class PatientListResolverService implements Resolve<Patient[] | string> {
    constructor(private _patientService: PatientService) {}

    // Don't have to explicitly subscribe to observable, resolver does it automatically
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Patient[] | string> {
        return this._patientService.getPatients()
            .pipe(
                catchError((err: any) => of(err)));
    }

}