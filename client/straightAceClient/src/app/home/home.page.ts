import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent ,IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonRouterOutlet, IonHeader, IonToolbar, IonTitle, IonContent,RouterOutlet],
})
export class HomePage {
  constructor() {}

  array = [1,2,3,4,5,7,3,4,]
}
