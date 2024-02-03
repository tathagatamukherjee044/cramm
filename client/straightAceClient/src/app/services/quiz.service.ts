import { Injectable } from '@angular/core';
import { config } from '../_store/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(
    private http : HttpClient,
  ) { }

  getQuiz(course: any,subject='all',seed: any){
    const url = `${config.api.GET_QUIZ}/${course}/${subject}/${seed}`
    return this.http.get(url,{}).pipe(map(res =>{
        return res;
      }))
  }
}
