import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';
import { MinimalInfoDialogComponent } from './minimal-info-dialog/minimal-info-dialog.component';
import { QuestionAcceptanceDialogComponent } from './question-acceptance-dialog/question-acceptance-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) {}

  showInfoDialog(heading: string, message: string): MatDialogRef<InfoDialogComponent> {
    return this.dialog.open(InfoDialogComponent, {
      backdropClass : "blurBackdrop",
      data: { 
        heading, 
        message 
      },
      width: '400px',
    });
  }

  showMinimalInfo(message: string): MatDialogRef<MinimalInfoDialogComponent> {
    return this.dialog.open(MinimalInfoDialogComponent, {
      data: { message },
      panelClass: 'minimal-dialog-container',
      position: { top: '0', left: '0', right: '0' },
      hasBackdrop: false,
    });
  }

  showQuestionAcceptanceModal() : MatDialogRef<QuestionAcceptanceDialogComponent> { 
    return this.dialog.open(QuestionAcceptanceDialogComponent, {
      backdropClass : "blurBackdrop",
      panelClass: 'question-acceptance-dialog-container',
      width: '400px',
    });
  }
}
