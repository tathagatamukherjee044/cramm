import { Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { ProfilePage } from './user/profile/profile.page';
import { UserModule } from './user/user.module';
import { LandingComponent } from './landing/landing.component';
import { AddQuestionComponent } from './quiz/add-question/add-question.component';
import { PrivacyComponent } from './_static/privacy/privacy.component';
import { TermsComponent } from './_static/terms/terms.component';

export const routes: Routes = [

  {
    path: '',
    component : LandingComponent,
  },
  {
    path: 'privacy',
    component : PrivacyComponent,
  },
  {
    path : 'terms',
    component : TermsComponent
  },


  // CSR
  {
    path: '',
    component : HomePage,
    children: [
      {
        path: 'learn',
        // component: HomePage,
        loadChildren: () =>
          import('./learn/learn.module').then(
            (m) => m.LearnModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./user/user.module').then(
            (m) => m.UserModule
          )
        
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
  {
    path: 'learn-more',
    loadComponent: () => import('./learn/learn-more/learn-more.page').then( m => m.LearnMorePage)
  },
  {
    path: 'profile',
    loadComponent: () => import('./user/profile/profile.page').then( m => m.ProfilePage)
  },
];
