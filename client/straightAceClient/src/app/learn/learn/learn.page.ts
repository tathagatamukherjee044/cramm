import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StorageService } from 'src/app/_services/storage.service';
import { IonApp, IonCol, IonContent, IonFooter, IonHeader, IonIcon, IonRouterOutlet, IonRow, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar } from '@ionic/angular/standalone';


@Component({
  selector: 'app-learn',
  templateUrl: './learn.page.html',
  styleUrls: ['./learn.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule,IonHeader, IonToolbar, IonTitle, IonContent ,IonRouterOutlet ,IonFooter, IonApp, IonTabBar, IonTabs, IonIcon, IonTabButton, IonCol, IonRow]
})
export class LearnPage implements OnInit {

  streak : string = ''

  constructor(
    private storageService : StorageService
  ) { }

  ngOnInit() {
    this.streak = this.storageService.getStorage('streak')
  }

}
