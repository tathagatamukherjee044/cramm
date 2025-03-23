import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizItemComponent } from './quiz-item/quiz-item.component';
import { RouterModule, Routes } from '@angular/router';
import { QuizPageComponent } from './quiz-page/quiz-page.component';
import { AddQuestionComponent } from './add-question/add-question.component';

const routes : Routes = [
  {
    path : "",
    component : QuizPageComponent
  },
  {
    path : "add",
    component : AddQuestionComponent
  }
]

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class QuizModule { }
