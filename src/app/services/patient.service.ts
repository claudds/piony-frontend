import { Injectable } from '@angular/core';
import { Patient } from '../models/patient.model';
import { Condition } from '../models/condition.model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable()
export class PatientService {

  constructor(private _httpClient: HttpClient) {}

  //private BASE_URL = 'https://virtserver.swaggerhub.com/TactioHealth/piony/1.0.2';
  private BASE_URL = 'http://localhost:3000';
  private patients: Patient[] = [ ];

  private handleHttpError(errorResponse : HttpErrorResponse) {
    if(errorResponse.error instanceof ErrorEvent) { 
      console.error("Client side error: " + errorResponse.error.message);
    } else {
      console.error("Server side error: " + errorResponse.error);
    }
    return throwError('There is a problem with the HTTP service. Please try again later');
  }

  getPatients(): Observable<Patient[]> {
    return this._httpClient.get<Patient[]>( `${this.BASE_URL}/patients`)
      .pipe(
        catchError(this.handleHttpError)
      );
  }

  getPatient(id: number): Observable<Patient> {
    return this._httpClient.get<Patient>( `${this.BASE_URL}/patients/${id}`)
      .pipe(
        catchError(this.handleHttpError)
      );
  }

  addPatient(patient: Patient): Observable<Patient> {
    // JSON server is automatically incrementing the IDs for me. However, I'm assuming that
    // ids are going to be handled in the backend. Shouldn't be handled here.

    //But if i had to handle them here, this is how i'd do it
    //reduce patients list to a single patient, with the max ID in the list
    // let pats =  [];
    // this.getPatients().subscribe((response) => {
    //   pats = response;
    // })
    // const newId: number = pats.reduce(function (p1, p2) {
    //   return (p1.id > p2.id) ? p1 : p2;
    // }).id;
    // patient.id = newId + 1;
    return this._httpClient.post<Patient>(`${this.BASE_URL}/patients`, patient, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
    .pipe(
      catchError(this.handleHttpError)
    );
  }

  editPatient(patient: Patient): Observable<Patient> {
    return this._httpClient.put<Patient>(`${this.BASE_URL}/patients/${patient.id}`, patient, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
    .pipe(
      catchError(this.handleHttpError)
    );
  }

  deletePatient(id: number): Observable<void> { 
    return this._httpClient.delete<void>(`${this.BASE_URL}/patients/${id}`)
    .pipe(
      catchError(this.handleHttpError)
    );
  }

  getConditions() {
    return this._httpClient.get<Condition[]>( this.BASE_URL + '/conditions/')
      .pipe(
        catchError(this.handleHttpError)
      );
  }
}