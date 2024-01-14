import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizComponent } from './quiz/quiz.component';
import { QuestionItemComponent } from './question-item/question-item.component';



@NgModule({
  declarations: [
    QuizComponent,
    QuestionItemComponent
  ],
  imports: [
    CommonModule
  ]
})
export class QuizModule { }
