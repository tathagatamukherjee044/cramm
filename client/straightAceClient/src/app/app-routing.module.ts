import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionItemComponent } from './quiz/question-item/question-item.component';

const routes: Routes = [
  { path: '', 
    component : QuestionItemComponent,
    loadChildren: () => import('./quiz/quiz.module').then(m => m.QuizModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
