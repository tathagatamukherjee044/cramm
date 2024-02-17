import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AlertController } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private alertController: AlertController,
    private router : Router
    ) { }

  async presentLoginAlert() {
    const alert = await this.alertController.create({
      header: 'Login',
      // subHeader: 'A Sub Header Is Optional',
      message: 'Please Login to Continue',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Alert canceled');
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            console.log('Alert confirmed');
            this.router.navigate(['/auth/login'])
          },
        },
      ]
    });

    await alert.present();
  }

  async presentReloadAlert() {
    const alert = await this.alertController.create({
      header: 'Reload',
      // subHeader: 'A Sub Header Is Optional',
      message: 'Please Reload',
      buttons: [
        // {
        //   text: 'Cancel',
        //   role: 'cancel',
        //   handler: () => {
        //     console.log('Alert canceled');
        //   },
        // },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            console.log('Alert confirmed');
            window.location.reload
          },
        },
      ]
    });

    await alert.present();
  }
}
