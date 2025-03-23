import { Injectable } from '@angular/core';
import { config } from '../_shared/_store/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(
    private http : HttpClient,
  ) { }

  getSubjects() {
    return this.http.get(config.api.GET_SUBJECTS,{}).pipe(map(res =>{
      return res;
    }))
  }
}
