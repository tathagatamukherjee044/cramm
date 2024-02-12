import { Injectable } from '@angular/core';
import { InfoDialogComponent } from '../_core/dialogs/info-dialog/info-dialog.component';
import { InfoModalComponent } from '../_core/modals/info-modal/info-modal.component';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { ModalController } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  // constructor(public dialogRef: MatDialogRef<InfoDialogComponent>) { }

  constructor (
    public dialog: MatDialog,
    private modalCtrl: ModalController
  ) { }

  showInfoDialog() {
   const dialogRef = this.dialog.open(InfoDialogComponent, {    })

   return dialogRef
  }

  async showResultsModal() {
    const modal = await this.modalCtrl.create({
      component: InfoModalComponent,
    });
    modal.present();

    return modal
  }

  async openModal() {
   
  }

}
