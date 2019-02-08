import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router, ActivatedRoute, Params
} from '@angular/router';
import { Injectable } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class PatientsDetailsCanActivateGuardService implements CanActivate {

    constructor(private patientService: PatientService,
        private _router: Router,
        private _route: ActivatedRoute) { }

    // Prefetching patients list
    canActivate(route: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): Observable<boolean> {
        const nullObj = {}
        return this.patientService.getPatient(+route.paramMap.get('patientid')).pipe(
            map((patient) => {
                const patientExists = !!patient;
                console.log(patientExists);
                if (patientExists) {
                    return true;
                }
            }),
            catchError((err) => {
                this._router.navigate(['/404']);
                return of(false);
            })
        )
    };
}