import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent ,IonRouterOutlet ,IonFooter, IonApp, IonTabBar, IonTabs, IonIcon, IonTabButton, IonCol, IonRow } from '@ionic/angular/standalone';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.page.html',
  styleUrls: ['./main-layout.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule,IonHeader, IonToolbar, IonTitle, IonContent ,IonRouterOutlet ,IonFooter, IonApp, IonTabBar, IonTabs, IonIcon, IonTabButton, IonCol, IonRow]
})
export class MainLayoutPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
