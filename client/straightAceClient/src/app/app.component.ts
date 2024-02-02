import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IonApp, IonContent, IonFooter, IonHeader, IonRouterOutlet, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet,RouterOutlet,IonHeader,IonToolbar,IonTitle,IonFooter,IonContent],
})
export class AppComponent {
  constructor() {}
}
