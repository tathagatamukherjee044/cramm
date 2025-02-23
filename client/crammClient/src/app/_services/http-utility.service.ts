import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, throwError } from 'rxjs';
import {Options} from '../_shared/_interface/intreface'

@Injectable({
  providedIn: 'root'
})
export class HttpUtilityService {

  constructor(
    private http : HttpClient,
  ) { }
  

  public get(url: string, options?: Options): Observable<any> {
    return this.http.get(url, options)
      .pipe(
        // catchError(this.handleError)
      );
  }

  public post(url: string, body: any, options?: Options): Observable<any> {
    return this.http.post(url, body, options)
      .pipe(
        // catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError('Something went wrong. Please try again later.');
  }

}
