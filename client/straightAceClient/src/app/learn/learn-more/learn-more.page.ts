import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonApp, IonCol, IonContent, IonFooter, IonHeader, IonIcon, IonRouterOutlet, IonRow, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-learn-more',
  templateUrl: './learn-more.page.html',
  styleUrls: ['./learn-more.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule,IonApp, IonCol, IonContent, IonFooter, IonHeader, IonIcon, IonRouterOutlet, IonRow, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar]
})
export class LearnMorePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
