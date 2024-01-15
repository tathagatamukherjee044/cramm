import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizItemComponent } from './quiz-item/quiz-item.component';
import { RouterModule, Routes } from '@angular/router';
import { QuizPageComponent } from './quiz-page/quiz-page.component';

const routes : Routes = [
  {
    path : "",
    component : QuizPageComponent
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
