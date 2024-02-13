import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { InfoModalComponent } from '../_core/modals/info-modal/info-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private modalCtrl: ModalController) { }

  async showResultsModal() {
    const modal = await this.modalCtrl.create({
      component: InfoModalComponent,
    });
    modal.present();

    return modal
  }
}
