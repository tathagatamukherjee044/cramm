import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent ,IonRouterOutlet ,IonFooter, IonApp, IonTabBar, IonTabs, IonIcon, IonTabButton, IonCol, IonRow } from '@ionic/angular/standalone';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [RouterOutlet,RouterLink,IonHeader, IonToolbar, IonTitle, IonContent ,IonRouterOutlet ,IonFooter, IonApp, IonTabBar, IonTabs, IonIcon, IonTabButton, IonCol, IonRow],
})
export class HomePage {
  constructor(
    private router : Router
  ) {}

  array = [1,2,3,4,5,7,3,4,4,4455,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]

  menuItems = [
    {
      link : '/learn',
      display : 'Learn',
      icon : "book-outline"
    },
    {
      link : '/profile',
      display : 'Profile',
      icon: 'person-circle-outline'
    }
  ]

  ngOnInit() {
    console.log(environment.apiUrl);
    
  }

  show() {
    console.log(environment.apiUrl);
  }

  route(route : string) {
    this.router.navigate([route])
  }
}
