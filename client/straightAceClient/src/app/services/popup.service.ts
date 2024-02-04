import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor(
    private toastController : ToastController
  ) { }

  async presentToast(position: 'top' | 'middle' | 'bottom', message = '') {
    const toast = await this.toastController.create({
      message,
      duration: 1500,
      position: position,
    });

    await toast.present();
  }
}
