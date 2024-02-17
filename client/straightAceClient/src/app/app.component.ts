import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IonApp, IonContent, IonFooter, IonHeader, IonRouterOutlet, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet,RouterOutlet,IonHeader,IonToolbar,IonTitle,IonFooter,IonContent],
})
export class AppComponent implements OnInit {
  constructor(
    private auth : AuthService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      
      this.auth.getData().subscribe()
    }, 1000);
  }
}
