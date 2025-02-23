import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TripService {

  tripModelBuyer : any
  tripToView : any

  constructor(private http : HttpClient) { }


  getTripsForBuyer(tripModel: any) : Observable<any>{
    this.tripModelBuyer = tripModel;
    return this.http.post('http://localhost:8080/trip/search',this.tripModelBuyer).pipe(res => {
      return res;
    });
  }

  getSingleTrip(tripId : any) : Observable<any>{
    return this.http.post('http://localhost:8080/trip/get',tripId).pipe(res => {
      return res;
    });
  }

  createTrip(tripModel: any) {
    return this.http.post('http://localhost:8080/trip/put',tripModel).pipe(res =>{
      return res;
    })
  }

  setTripToView(tripId: any){
    this.tripToView = tripId;
  }

  getTripToView(){
    return this.tripToView;
  }

  requestTrip(tripRequest: any){
    return this.http.post('http://localhost:8080/trip/request',tripRequest).pipe(res => {
      return res;
    });
  }

  approveTrip(tripRequest: any){
    return this.http.post('http://localhost:8080/trip/approve',tripRequest).pipe(res => {
      return res;
    });
  }

  getCreatorTrips(){
    return this.http.post('http://localhost:8080/trip/getCreator',{}).pipe(res => {
      return res;
    });
  }

  getConsumerTrips(){
    return this.http.post('http://localhost:8080/trip/getConsumer',{}).pipe(res => {
      return res;
    });
  }
}
