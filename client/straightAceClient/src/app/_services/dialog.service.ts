import { Injectable } from '@angular/core';
import { InfoDialogComponent } from '../_core/dialogs/info-dialog/info-dialog.component';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  // constructor(public dialogRef: MatDialogRef<InfoDialogComponent>) { }

  constructor (
    public dialog: MatDialog
  ) { }

  showInfoDialog() {
   const dialogRef = this.dialog.open(InfoDialogComponent, {    })

   return dialogRef
  }

}
