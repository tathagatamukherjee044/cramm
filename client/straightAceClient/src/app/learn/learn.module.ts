import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LearnPage } from './learn/learn.page';
import { RouterModule, Routes } from '@angular/router';


const routes : Routes = [
  {
    path : "",
    component : LearnPage
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
