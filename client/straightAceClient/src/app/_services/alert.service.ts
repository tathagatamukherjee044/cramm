import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private router : Router
    ) { }

  async presentLoginAlert() {
    // const console.log = await this.alertController.create({
    //   header: 'Login',
    //   // subHeader: 'A Sub Header Is Optional',
    //   message: 'Please Login to Continue',
    //   buttons: [
    //     {
    //       text: 'Cancel',
    //       role: 'cancel',
    //       handler: () => {
    //         console.log('Alert canceled');
    //       },
    //     },
    //     {
    //       text: 'OK',
    //       role: 'confirm',
    //       handler: () => {
    //         console.log('Alert confirmed');
    //         this.router.navigate(['/auth/login'])
    //       },
    //     },
    //   ]
    // });

    console.log('login)')
  }

  async presentReloadAlert() {
    // const console.log = await this.alertController.create({
    //   header: 'Reload',
    //   // subHeader: 'A Sub Header Is Optional',
    //   message: 'Please Reload',
    //   buttons: [
    //     // {
    //     //   text: 'Cancel',
    //     //   role: 'cancel',
    //     //   handler: () => {
    //     //     console.log('Alert canceled');
    //     //   },
    //     // },
    //     {
    //       text: 'OK',
    //       role: 'confirm',
    //       handler: () => {
    //         console.log('Alert confirmed');
    //         window.location.reload
    //       },
    //     },
    //   ]
    // });

    console.log('reload')
  }
}
