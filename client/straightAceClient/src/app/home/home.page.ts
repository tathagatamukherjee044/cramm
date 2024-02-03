import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent ,IonRouterOutlet ,IonFooter, IonApp, IonTabBar, IonTabs, IonIcon, IonTabButton } from '@ionic/angular/standalone';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonFooter, IonRouterOutlet, IonHeader, IonToolbar, IonTitle, IonContent,RouterOutlet, IonApp,IonTabBar,IonTabs,IonIcon,IonTabButton,RouterLink],
})
export class HomePage {
  constructor() {}

  array = [1,2,3,4,5,7,3,4,4,4455,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]

  ngOnInit() {
    console.log(environment.apiUrl);
    
  }
}
