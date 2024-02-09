import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor(
    private toastController : ToastController
  ) { }

  async presentToast(message = '',  position: 'top' | 'middle' | 'bottom'= 'bottom', duration = 750) {
    const toast = await this.toastController.create({
      message : message,
      duration: duration,
      position: position,
    });

    await toast.present();
  }
}
