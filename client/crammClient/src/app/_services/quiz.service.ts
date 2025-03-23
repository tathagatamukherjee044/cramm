import { Injectable } from '@angular/core';
import { config } from '../_shared/_store/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Question } from '../_shared/_interface/intreface';

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

  addQuiz(question: Question,subject: string){
    const url = `${config.api.ADD_QUIZ}/${subject}`
    return this.http.post(url,question).pipe(map(res =>{
        return res;
      }))
  }

  quizComplete(){
    return this.http.post(config.api.QUIZ_COMPLETED,{}).pipe(map(res =>{
        return res;
      }))
  }

  updateTime(){
    return this.http.post(config.api.UPDATE_TIME_EXP,{}).pipe(map(res =>{
        return res;
      }))
  }
}
