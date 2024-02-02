import { Routes } from '@angular/router';
import { HomePage } from './home/home.page';

export const routes: Routes = [
  {
    path: '',
    component : HomePage,
    children: [
      // {
      //   path: '',
      //   redirectTo: 'learn',
      //   pathMatch: 'full',
      // },
      {
        path: 'learn',
        // component: HomePage,
        loadChildren: () =>
          import('./learn/learn.module').then(
            (m) => m.LearnModule
          ),
      },
    ],
  },
  
  {
    path: 'quiz',
    loadChildren: () => import('./quiz/quiz.module').then((m) => m.QuizModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'main-layout',
    loadComponent: () => import('./layouts/main-layout/main-layout.page').then( m => m.MainLayoutPage)
  },
];
