import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePage } from './profile/profile.page';
import { RouterModule,Routes } from '@angular/router';

const routes : Routes = [
  {
    path : "",
    component : ProfilePage
  },
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class UserModule { }
