import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LearnPage } from './learn/learn.page';
import { RouterModule, Routes } from '@angular/router';
import { LearnMorePage } from './learn-more/learn-more.page';


const routes : Routes = [
  {
    path : "",
    component : LearnPage
  },
  {
    path : "lm",
    component : LearnMorePage
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
export class LearnModule { }
