import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

@Injectable()
export class RiskService {

  constructor(private _httpClient: HttpClient) {}

  private BASE_URL = ' https://open.propellerhealth.com/prod/forecast';

  private handleHttpError(errorResponse : HttpErrorResponse) {
    if(errorResponse.error instanceof ErrorEvent) { 
      console.error("Client side error: " + errorResponse.error.message);
    } else {
      console.error("Server side error: " + errorResponse.error);
    }
    return throwError('There is a problem with the HTTP service. Please try again later');
  }

  getRisk(postalCode: string): Observable<any> {
      const params = { params: new HttpParams().set('postalCode', postalCode) };
    return this._httpClient.get<any>( `${this.BASE_URL}`, params)
      .pipe(
        catchError(this.handleHttpError)
      );
  }
}